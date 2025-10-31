from datetime import datetime
from app import db

class CaseStudy(db.Model):
    """Case Study model"""
    __tablename__ = 'case_studies'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Basic Information
    project_name = db.Column(db.String(200), nullable=False)
    client_name = db.Column(db.String(200), nullable=False)
    industry = db.Column(db.String(100))
    project_year = db.Column(db.Integer)
    
    # Project Details
    challenge = db.Column(db.Text, nullable=False)
    solution = db.Column(db.Text, nullable=False)
    outcomes = db.Column(db.Text, nullable=False)
    
    # Technical Information
    technologies = db.Column(db.String(500))  # Comma-separated
    team_size = db.Column(db.Integer)
    duration_months = db.Column(db.Integer)
    
    # Additional Information
    tags = db.Column(db.String(500))  # Comma-separated
    project_value = db.Column(db.String(100))  # e.g., "$100K-$500K"
    confidential = db.Column(db.Boolean, default=False)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = db.Column(db.String(100))
    
    # Relationships
    attachments = db.relationship('Attachment', backref='case_study', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'project_name': self.project_name,
            'client_name': self.client_name,
            'industry': self.industry,
            'project_year': self.project_year,
            'challenge': self.challenge,
            'solution': self.solution,
            'outcomes': self.outcomes,
            'technologies': self.technologies,
            'team_size': self.team_size,
            'duration_months': self.duration_months,
            'tags': self.tags,
            'project_value': self.project_value,
            'confidential': self.confidential,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'created_by': self.created_by,
            'attachments': [att.to_dict() for att in self.attachments]
        }
    
    def __repr__(self):
        return f'<CaseStudy {self.project_name}>'


class Attachment(db.Model):
    """Attachment model for case studies"""
    __tablename__ = 'attachments'
    
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_type = db.Column(db.String(50))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    case_study_id = db.Column(db.Integer, db.ForeignKey('case_studies.id'), nullable=False)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'filename': self.original_filename,
            'file_type': self.file_type,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }
    
    def __repr__(self):
        return f'<Attachment {self.original_filename}>'


class PPTTemplate(db.Model):
    """PowerPoint Template model"""
    __tablename__ = 'ppt_templates'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text)
    is_default = db.Column(db.Boolean, default=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'filename': self.filename,
            'description': self.description,
            'is_default': self.is_default,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }
    
    def __repr__(self):
        return f'<PPTTemplate {self.name}>'
