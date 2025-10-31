# Case Study Manager

A web-based application for IT consulting companies to collect, manage, and export case studies for RfPs and similar proposals.

## Features

✅ **Case Study Management**
- Create, read, update, and delete case studies
- Store comprehensive project information (client, industry, challenge, solution, outcomes)
- Track technologies, team size, duration, and project value
- Tag-based categorization for easy discovery
- Mark case studies as confidential

✅ **Advanced Search & Filtering**
- Full-text search across all fields
- Filter by industry, year, technologies, and tags
- Sort by various criteria (date, project name, year)
- Faceted navigation for quick filtering

✅ **PowerPoint Export with Templates**
- Upload custom PowerPoint templates with placeholders
- Automatically fill templates with case study data
- Support for multiple templates (set default)
- Export individual case studies to branded PowerPoint presentations

✅ **Dashboard & Analytics**
- Overview of total case studies
- Recent case studies display
- Statistics by industry
- Quick access to common actions

## Tech Stack

- **Backend**: Python 3.8+, Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3 (Bootstrap 5), JavaScript (Vanilla)
- **Database**: SQLite (easily upgradeable to PostgreSQL)
- **PowerPoint**: python-pptx library

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/toto/ghcp-test
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python run.py
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## PowerPoint Template Guide

### Creating a Template

1. Create a PowerPoint presentation with your company's branding
2. Add text placeholders using double curly braces `{{PLACEHOLDER_NAME}}`
3. Save as `.pptx` format
4. Upload through the "Templates" section in the application

### Available Placeholders

Use these placeholders in your PowerPoint template:

| Placeholder | Description | Example Output |
|------------|-------------|----------------|
| `{{PROJECT_NAME}}` | Project name | "Cloud Migration Project" |
| `{{CLIENT}}` | Client name | "Acme Corporation" |
| `{{INDUSTRY}}` | Industry sector | "Healthcare" |
| `{{YEAR}}` | Project year | "2024" |
| `{{CHALLENGE}}` | Problem statement | "Legacy systems causing..." |
| `{{SOLUTION}}` | Solution provided | "Implemented cloud-based..." |
| `{{OUTCOMES}}` | Results achieved | "Reduced costs by 40%..." |
| `{{TECHNOLOGIES}}` | Technologies used | "AWS, Python, React" |
| `{{TEAM_SIZE}}` | Team size | "5 people" |
| `{{DURATION}}` | Project duration | "6 months" |
| `{{PROJECT_VALUE}}` | Project budget | "$100K-$500K" |
| `{{TAGS}}` | Keywords | "cloud, migration, AWS" |
| `{{CREATED_BY}}` | Author | "John Doe" |
| `{{EXPORT_DATE}}` | Export date | "October 31, 2025" |

### Template Example

```
Slide 1 - Title:
{{PROJECT_NAME}}
Client: {{CLIENT}}

Slide 2 - Overview:
Industry: {{INDUSTRY}}
Year: {{YEAR}}
Duration: {{DURATION}}
Team Size: {{TEAM_SIZE}}

Slide 3 - Challenge:
{{CHALLENGE}}

Slide 4 - Solution:
{{SOLUTION}}

Slide 5 - Outcomes:
{{OUTCOMES}}

Technologies: {{TECHNOLOGIES}}
```

## Usage

### Adding a Case Study

1. Click "Add Case" in the navigation bar
2. Fill in the required fields (marked with *)
3. Add optional information (technologies, team size, tags)
4. Click "Save Case Study"

### Searching for Cases

1. Click "View Cases" in the navigation
2. Use the search box for text search
3. Apply filters for industry, year, or technologies
4. Click on a case to view full details

### Exporting to PowerPoint

1. Ensure you have uploaded at least one PowerPoint template
2. Find the case study you want to export
3. Click the "Export to PowerPoint" button
4. The system will generate a filled PowerPoint presentation
5. Download the generated file

### Managing Templates

1. Click "Templates" in the navigation
2. Upload a new template (.pptx file)
3. Set one template as default (used for quick exports)
4. Delete templates you no longer need

## Project Structure

```
case-study-manager/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── models.py            # Database models
│   ├── routes.py            # API endpoints
│   ├── search.py            # Search functionality
│   └── ppt_export.py        # PowerPoint export logic
├── static/
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── app.js           # Frontend JavaScript
├── templates/
│   └── index.html           # Main HTML template
├── uploads/                 # File uploads (auto-created)
│   ├── templates/           # PowerPoint templates
│   └── attachments/         # Future: file attachments
├── config.py                # Configuration
├── run.py                   # Application entry point
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## API Endpoints

### Case Studies

- `GET /api/case-studies` - Get all case studies (with filters)
- `GET /api/case-studies/<id>` - Get specific case study
- `POST /api/case-studies` - Create new case study
- `PUT /api/case-studies/<id>` - Update case study
- `DELETE /api/case-studies/<id>` - Delete case study
- `GET /api/case-studies/<id>/export/pptx` - Export to PowerPoint

### Templates

- `GET /api/templates` - Get all templates
- `POST /api/templates` - Upload new template
- `DELETE /api/templates/<id>` - Delete template
- `POST /api/templates/<id>/set-default` - Set as default

### Other

- `GET /api/facets` - Get filter options
- `GET /api/stats` - Get statistics
- `GET /api/placeholder-guide` - Get placeholder guide

## Configuration

Edit `config.py` to customize:

- Database location
- Upload folder paths
- Maximum file upload size
- Allowed file extensions
- Session settings

## Security Considerations

For production deployment:

1. Change the `SECRET_KEY` in `config.py` (use environment variable)
2. Set `debug=False` in `run.py`
3. Use a production WSGI server (e.g., Gunicorn)
4. Add authentication/authorization
5. Use HTTPS
6. Implement rate limiting
7. Validate and sanitize all inputs
8. Use environment variables for sensitive configuration

## Future Enhancements

- [ ] User authentication and authorization
- [ ] File attachments for case studies
- [ ] PDF export option
- [ ] Batch export (multiple cases)
- [ ] Advanced analytics and reporting
- [ ] Client logos and screenshots
- [ ] Version history for case studies
- [ ] Export to Word documents
- [ ] REST API authentication
- [ ] Docker containerization
- [ ] PostgreSQL migration guide

## Troubleshooting

### Database Issues

If you encounter database errors:
```bash
rm case_studies.db
python run.py  # Will recreate the database
```

### Template Issues

- Ensure your template uses `.pptx` format (not `.ppt`)
- Check that placeholders use double curly braces: `{{PLACEHOLDER}}`
- Placeholders are case-sensitive
- Test your template before uploading

### Port Already in Use

If port 5000 is in use:
```bash
python run.py --port 5001
```

Or edit `run.py` and change the port number.

## License

This project is provided as-is for internal use by IT consulting companies.

## Support

For issues or questions, please contact your development team.

---

**Happy Case Study Managing! 🚀**
