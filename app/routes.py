import os
from flask import Blueprint, render_template, request, jsonify, send_file, current_app
from werkzeug.utils import secure_filename
from datetime import datetime
from app import db
from app.models import CaseStudy, Attachment, PPTTemplate
from app.search import SearchService
from app.ppt_export import PPTExporter

main = Blueprint('main', __name__)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


@main.route('/')
def index():
    """Home page"""
    return render_template('index.html')


@main.route('/api/case-studies', methods=['GET'])
def get_case_studies():
    """Get all case studies with optional filtering"""
    query = request.args.get('q', '')
    industry = request.args.get('industry', '')
    year = request.args.get('year', '')
    technologies = request.args.get('technologies', '')
    tags = request.args.get('tags', '')
    sort_by = request.args.get('sort_by', 'updated_at')
    sort_order = request.args.get('sort_order', 'desc')
    
    # Search
    case_studies = SearchService.search(
        query=query if query else None,
        industry=industry if industry else None,
        year=year if year else None,
        technologies=technologies if technologies else None,
        tags=tags if tags else None,
        sort_by=sort_by,
        sort_order=sort_order
    )
    
    return jsonify([cs.to_dict() for cs in case_studies])


@main.route('/api/case-studies/<int:id>', methods=['GET'])
def get_case_study(id):
    """Get a specific case study"""
    case_study = CaseStudy.query.get_or_404(id)
    return jsonify(case_study.to_dict())


@main.route('/api/case-studies', methods=['POST'])
def create_case_study():
    """Create a new case study"""
    data = request.get_json()
    
    case_study = CaseStudy(
        project_name=data.get('project_name'),
        client_name=data.get('client_name'),
        industry=data.get('industry'),
        project_year=data.get('project_year'),
        challenge=data.get('challenge'),
        solution=data.get('solution'),
        outcomes=data.get('outcomes'),
        technologies=data.get('technologies'),
        team_size=data.get('team_size'),
        duration_months=data.get('duration_months'),
        tags=data.get('tags'),
        project_value=data.get('project_value'),
        confidential=data.get('confidential', False),
        created_by=data.get('created_by', 'System')
    )
    
    db.session.add(case_study)
    db.session.commit()
    
    return jsonify(case_study.to_dict()), 201


@main.route('/api/case-studies/<int:id>', methods=['PUT'])
def update_case_study(id):
    """Update a case study"""
    case_study = CaseStudy.query.get_or_404(id)
    data = request.get_json()
    
    # Update fields
    for field in ['project_name', 'client_name', 'industry', 'project_year',
                  'challenge', 'solution', 'outcomes', 'technologies',
                  'team_size', 'duration_months', 'tags', 'project_value',
                  'confidential']:
        if field in data:
            setattr(case_study, field, data[field])
    
    case_study.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(case_study.to_dict())


@main.route('/api/case-studies/<int:id>', methods=['DELETE'])
def delete_case_study(id):
    """Delete a case study"""
    case_study = CaseStudy.query.get_or_404(id)
    
    # Delete associated attachments from filesystem
    for attachment in case_study.attachments:
        try:
            os.remove(attachment.file_path)
        except:
            pass
    
    db.session.delete(case_study)
    db.session.commit()
    
    return '', 204


@main.route('/api/facets', methods=['GET'])
def get_facets():
    """Get filtering facets"""
    facets = SearchService.get_facets()
    return jsonify(facets)


@main.route('/api/templates', methods=['GET'])
def get_templates():
    """Get all PowerPoint templates"""
    templates = PPTTemplate.query.all()
    return jsonify([t.to_dict() for t in templates])


@main.route('/api/templates', methods=['POST'])
def upload_template():
    """Upload a PowerPoint template"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.endswith('.pptx'):
        return jsonify({'error': 'Only .pptx files are allowed'}), 400
    
    # Get form data
    name = request.form.get('name', file.filename)
    description = request.form.get('description', '')
    is_default = request.form.get('is_default', 'false').lower() == 'true'
    
    # Save file
    filename = secure_filename(file.filename)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{timestamp}_{filename}"
    file_path = os.path.join(current_app.config['TEMPLATE_FOLDER'], filename)
    file.save(file_path)
    
    # If this is set as default, unset other defaults
    if is_default:
        PPTTemplate.query.update({'is_default': False})
    
    # Create template record
    template = PPTTemplate(
        name=name,
        filename=filename,
        file_path=file_path,
        description=description,
        is_default=is_default
    )
    
    db.session.add(template)
    db.session.commit()
    
    return jsonify(template.to_dict()), 201


@main.route('/api/templates/<int:id>', methods=['DELETE'])
def delete_template(id):
    """Delete a PowerPoint template"""
    template = PPTTemplate.query.get_or_404(id)
    
    # Delete file
    try:
        os.remove(template.file_path)
    except:
        pass
    
    db.session.delete(template)
    db.session.commit()
    
    return '', 204


@main.route('/api/templates/<int:id>/set-default', methods=['POST'])
def set_default_template(id):
    """Set a template as default"""
    template = PPTTemplate.query.get_or_404(id)
    
    # Unset all other defaults
    PPTTemplate.query.update({'is_default': False})
    
    # Set this as default
    template.is_default = True
    db.session.commit()
    
    return jsonify(template.to_dict())


@main.route('/api/case-studies/<int:id>/export/pptx', methods=['GET'])
def export_to_pptx(id):
    """Export a case study to PowerPoint"""
    case_study = CaseStudy.query.get_or_404(id)
    
    # Get template ID from query params or use default
    template_id = request.args.get('template_id')
    
    if template_id:
        template = PPTTemplate.query.get_or_404(template_id)
    else:
        # Get default template
        template = PPTTemplate.query.filter_by(is_default=True).first()
        if not template:
            return jsonify({'error': 'No template available. Please upload a template first.'}), 400
    
    # Export to PowerPoint
    exporter = PPTExporter(template.file_path)
    
    # Create output filename
    output_filename = f"case_study_{case_study.id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pptx"
    output_path = os.path.join(current_app.config['UPLOAD_FOLDER'], output_filename)
    
    try:
        exporter.export_case_study(case_study, output_path)
        return send_file(
            output_path,
            as_attachment=True,
            download_name=f"{secure_filename(case_study.project_name)}.pptx",
            mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation'
        )
    except Exception as e:
        return jsonify({'error': f'Export failed: {str(e)}'}), 500
    finally:
        # Clean up temporary file
        try:
            if os.path.exists(output_path):
                os.remove(output_path)
        except:
            pass


@main.route('/api/placeholder-guide', methods=['GET'])
def get_placeholder_guide():
    """Get the placeholder guide for PowerPoint templates"""
    guide = PPTExporter.get_placeholder_guide()
    return jsonify({'guide': guide})


@main.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about case studies"""
    total = CaseStudy.query.count()
    
    # Count by industry
    from sqlalchemy import func
    by_industry = db.session.query(
        CaseStudy.industry,
        func.count(CaseStudy.id)
    ).filter(
        CaseStudy.industry.isnot(None)
    ).group_by(
        CaseStudy.industry
    ).all()
    
    # Recent case studies
    recent = CaseStudy.query.order_by(
        CaseStudy.created_at.desc()
    ).limit(5).all()
    
    return jsonify({
        'total': total,
        'by_industry': [{'industry': ind, 'count': count} for ind, count in by_industry],
        'recent': [cs.to_dict() for cs in recent]
    })
