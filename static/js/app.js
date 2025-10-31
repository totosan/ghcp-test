// App state
let currentView = 'dashboard';
let currentCaseId = null;
let allCases = [];
let templates = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadDashboard();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('viewCases').addEventListener('click', (e) => {
        e.preventDefault();
        showView('caseList');
    });
    
    document.getElementById('addCase').addEventListener('click', (e) => {
        e.preventDefault();
        showCaseForm();
    });
    
    document.getElementById('manageTemplates').addEventListener('click', (e) => {
        e.preventDefault();
        showView('templates');
    });
    
    // Dashboard quick actions
    document.getElementById('quickAddCase').addEventListener('click', () => showCaseForm());
    document.getElementById('quickViewCases').addEventListener('click', () => showView('caseList'));
    document.getElementById('quickManageTemplates').addEventListener('click', () => showView('templates'));
    
    // Case form
    document.getElementById('caseForm').addEventListener('submit', handleCaseSubmit);
    document.getElementById('cancelForm').addEventListener('click', () => showView('caseList'));
    
    // Filters
    document.getElementById('applyFilters').addEventListener('click', loadCasesList);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') loadCasesList();
    });
    document.getElementById('sortBy').addEventListener('change', loadCasesList);
    document.getElementById('sortOrder').addEventListener('change', loadCasesList);
    
    // Template form
    document.getElementById('templateForm').addEventListener('submit', handleTemplateUpload);
    
    // Modal buttons
    document.getElementById('exportDetailCase').addEventListener('click', handleExportCase);
    document.getElementById('editDetailCase').addEventListener('click', handleEditCase);
    document.getElementById('deleteDetailCase').addEventListener('click', handleDeleteCase);
}

// View Management
function showView(view) {
    currentView = view;
    
    // Hide all views
    document.querySelectorAll('.view-container').forEach(v => v.style.display = 'none');
    
    // Show selected view
    switch(view) {
        case 'dashboard':
            document.getElementById('dashboardView').style.display = 'block';
            loadDashboard();
            break;
        case 'caseList':
            document.getElementById('caseListView').style.display = 'block';
            loadCasesList();
            loadFacets();
            break;
        case 'caseForm':
            document.getElementById('caseFormView').style.display = 'block';
            break;
        case 'templates':
            document.getElementById('templateView').style.display = 'block';
            loadTemplates();
            break;
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        document.getElementById('totalCases').textContent = stats.total;
        
        // Load recent cases
        const recentDiv = document.getElementById('recentCases');
        if (stats.recent.length === 0) {
            recentDiv.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: var(--text-secondary);"></i>
                    <p class="text-muted mt-3">No case studies yet. Add your first one!</p>
                </div>
            `;
        } else {
            recentDiv.innerHTML = stats.recent.map(cs => `
                <a href="#" class="list-group-item list-group-item-action" onclick="viewCaseDetail(${cs.id}); return false;">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center mb-1">
                                <h6 class="mb-0 me-2">${cs.project_name}</h6>
                                ${cs.industry ? `<span class="badge bg-secondary">${cs.industry}</span>` : ''}
                            </div>
                            <p class="mb-1 text-muted small">
                                <i class="bi bi-building"></i> ${cs.client_name}
                            </p>
                        </div>
                        <div class="text-end ms-3">
                            <small class="text-muted">
                                <i class="bi bi-clock"></i> ${new Date(cs.updated_at).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Case List
async function loadCasesList() {
    try {
        const params = new URLSearchParams({
            q: document.getElementById('searchInput').value || '',
            industry: document.getElementById('industryFilter').value || '',
            year: document.getElementById('yearFilter').value || '',
            technologies: document.getElementById('techFilter').value || '',
            sort_by: document.getElementById('sortBy').value,
            sort_order: document.getElementById('sortOrder').value
        });
        
        const response = await fetch(`/api/case-studies?${params}`);
        allCases = await response.json();
        
        document.getElementById('caseCount').textContent = allCases.length;
        
        const casesDiv = document.getElementById('casesList');
        if (allCases.length === 0) {
            casesDiv.innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i> No case studies found. Try adjusting your filters.
                </div>
            `;
        } else {
            casesDiv.innerHTML = allCases.map(cs => `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-9">
                                <div class="d-flex align-items-center mb-2">
                                    <h5 class="card-title mb-0 me-2">
                                        ${cs.project_name}
                                    </h5>
                                    ${cs.confidential ? '<span class="badge bg-warning text-dark"><i class="bi bi-shield-lock"></i> Confidential</span>' : ''}
                                </div>
                                <h6 class="card-subtitle mb-3 text-muted">
                                    <i class="bi bi-building"></i> ${cs.client_name} 
                                    ${cs.industry ? `<span class="mx-2">•</span> <i class="bi bi-tag"></i> ${cs.industry}` : ''} 
                                    ${cs.project_year ? `<span class="mx-2">•</span> <i class="bi bi-calendar"></i> ${cs.project_year}` : ''}
                                </h6>
                                <p class="card-text text-muted mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                    ${cs.challenge}
                                </p>
                                ${cs.technologies ? `
                                    <div class="mt-2">
                                        ${cs.technologies.split(',').map(t => 
                                            `<span class="badge bg-secondary me-1 mb-1"><i class="bi bi-code-slash"></i> ${t.trim()}</span>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                            </div>
                            <div class="col-md-3">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary btn-sm" onclick="viewCaseDetail(${cs.id})">
                                        <i class="bi bi-eye"></i> View Details
                                    </button>
                                    <button class="btn btn-outline-primary btn-sm" onclick="exportCase(${cs.id})">
                                        <i class="bi bi-file-earmark-ppt"></i> Export
                                    </button>
                                    <button class="btn btn-warning btn-sm" onclick="editCase(${cs.id})">
                                        <i class="bi bi-pencil"></i> Edit
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteCase(${cs.id})">
                                        <i class="bi bi-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading cases:', error);
        document.getElementById('casesList').innerHTML = 
            '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Error loading case studies.</div>';
    }
}

async function loadFacets() {
    try {
        const response = await fetch('/api/facets');
        const facets = await response.json();
        
        // Populate industry filter
        const industryFilter = document.getElementById('industryFilter');
        industryFilter.innerHTML = '<option value="">All Industries</option>' +
            facets.industries.map(ind => 
                `<option value="${ind.name}">${ind.name} (${ind.count})</option>`
            ).join('');
        
        // Populate year filter
        const yearFilter = document.getElementById('yearFilter');
        yearFilter.innerHTML = '<option value="">All Years</option>' +
            facets.years.map(y => 
                `<option value="${y.year}">${y.year} (${y.count})</option>`
            ).join('');
    } catch (error) {
        console.error('Error loading facets:', error);
    }
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('industryFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('techFilter').value = '';
    loadCasesList();
}

// Case Detail Modal
async function viewCaseDetail(id) {
    try {
        const response = await fetch(`/api/case-studies/${id}`);
        const cs = await response.json();
        
        currentCaseId = id;
        
        document.getElementById('detailProjectName').textContent = cs.project_name;
        document.getElementById('caseDetailBody').innerHTML = `
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1">Client</small>
                        <strong>${cs.client_name}</strong>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1">Industry</small>
                        <strong>${cs.industry || 'N/A'}</strong>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1">Year</small>
                        <strong>${cs.project_year || 'N/A'}</strong>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1">Project Value</small>
                        <strong>${cs.project_value || 'N/A'}</strong>
                    </div>
                </div>
            </div>
            
            <div class="mb-4">
                <h6><i class="bi bi-exclamation-circle"></i> Challenge</h6>
                <p class="text-muted">${cs.challenge}</p>
            </div>
            
            <div class="mb-4">
                <h6><i class="bi bi-lightbulb"></i> Solution</h6>
                <p class="text-muted">${cs.solution}</p>
            </div>
            
            <div class="mb-4">
                <h6><i class="bi bi-graph-up-arrow"></i> Outcomes</h6>
                <p class="text-muted">${cs.outcomes}</p>
            </div>
            
            <div class="row">
                <div class="col-md-12 mb-3">
                    <h6><i class="bi bi-code-slash"></i> Technologies</h6>
                    ${cs.technologies ? cs.technologies.split(',').map(t => 
                        `<span class="badge bg-secondary me-1 mb-1">${t.trim()}</span>`
                    ).join('') : '<span class="text-muted">N/A</span>'}
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1"><i class="bi bi-people"></i> Team Size</small>
                        <strong>${cs.team_size || 'N/A'}</strong>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="p-3" style="background-color: var(--hover-bg); border-radius: 8px;">
                        <small class="text-muted d-block mb-1"><i class="bi bi-calendar-range"></i> Duration</small>
                        <strong>${cs.duration_months ? cs.duration_months + ' months' : 'N/A'}</strong>
                    </div>
                </div>
            </div>
            
            ${cs.tags ? `
                <div class="mt-3">
                    <h6><i class="bi bi-tags"></i> Tags</h6>
                    ${cs.tags.split(',').map(t => 
                        `<span class="badge bg-info text-dark me-1 mb-1">${t.trim()}</span>`
                    ).join('')}
                </div>
            ` : ''}
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('caseDetailModal'));
        modal.show();
    } catch (error) {
        console.error('Error loading case detail:', error);
        alert('Error loading case study details.');
    }
}

// Case Form
function showCaseForm(caseId = null) {
    currentCaseId = caseId;
    
    if (caseId) {
        // Edit mode
        document.getElementById('formTitle').textContent = 'Edit Case Study';
        loadCaseForEdit(caseId);
    } else {
        // Add mode
        document.getElementById('formTitle').textContent = 'Add New Case Study';
        document.getElementById('caseForm').reset();
        document.getElementById('caseId').value = '';
    }
    
    showView('caseForm');
}

async function loadCaseForEdit(id) {
    try {
        const response = await fetch(`/api/case-studies/${id}`);
        const cs = await response.json();
        
        document.getElementById('caseId').value = cs.id;
        document.getElementById('projectName').value = cs.project_name || '';
        document.getElementById('clientName').value = cs.client_name || '';
        document.getElementById('industry').value = cs.industry || '';
        document.getElementById('projectYear').value = cs.project_year || '';
        document.getElementById('projectValue').value = cs.project_value || '';
        document.getElementById('challenge').value = cs.challenge || '';
        document.getElementById('solution').value = cs.solution || '';
        document.getElementById('outcomes').value = cs.outcomes || '';
        document.getElementById('technologies').value = cs.technologies || '';
        document.getElementById('teamSize').value = cs.team_size || '';
        document.getElementById('duration').value = cs.duration_months || '';
        document.getElementById('tags').value = cs.tags || '';
        document.getElementById('createdBy').value = cs.created_by || '';
        document.getElementById('confidential').checked = cs.confidential || false;
    } catch (error) {
        console.error('Error loading case for edit:', error);
        alert('Error loading case study.');
    }
}

async function handleCaseSubmit(e) {
    e.preventDefault();
    
    const caseId = document.getElementById('caseId').value;
    const data = {
        project_name: document.getElementById('projectName').value,
        client_name: document.getElementById('clientName').value,
        industry: document.getElementById('industry').value || null,
        project_year: document.getElementById('projectYear').value ? 
            parseInt(document.getElementById('projectYear').value) : null,
        project_value: document.getElementById('projectValue').value || null,
        challenge: document.getElementById('challenge').value,
        solution: document.getElementById('solution').value,
        outcomes: document.getElementById('outcomes').value,
        technologies: document.getElementById('technologies').value || null,
        team_size: document.getElementById('teamSize').value ? 
            parseInt(document.getElementById('teamSize').value) : null,
        duration_months: document.getElementById('duration').value ? 
            parseInt(document.getElementById('duration').value) : null,
        tags: document.getElementById('tags').value || null,
        created_by: document.getElementById('createdBy').value || 'System',
        confidential: document.getElementById('confidential').checked
    };
    
    try {
        const url = caseId ? `/api/case-studies/${caseId}` : '/api/case-studies';
        const method = caseId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showView('caseList');
            alert(caseId ? 'Case study updated successfully!' : 'Case study created successfully!');
        } else {
            alert('Error saving case study.');
        }
    } catch (error) {
        console.error('Error saving case:', error);
        alert('Error saving case study.');
    }
}

function editCase(id) {
    showCaseForm(id);
}

async function deleteCase(id) {
    if (!confirm('Are you sure you want to delete this case study?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            loadCasesList();
            alert('Case study deleted successfully!');
        } else {
            alert('Error deleting case study.');
        }
    } catch (error) {
        console.error('Error deleting case:', error);
        alert('Error deleting case study.');
    }
}

// Export functions
async function exportCase(id) {
    try {
        const response = await fetch(`/api/case-studies/${id}/export/pptx`);
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `case_study_${id}.pptx`;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            const error = await response.json();
            alert(error.error || 'Error exporting case study.');
        }
    } catch (error) {
        console.error('Error exporting case:', error);
        alert('Error exporting case study.');
    }
}

function handleExportCase() {
    if (currentCaseId) {
        exportCase(currentCaseId);
    }
}

function handleEditCase() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('caseDetailModal'));
    modal.hide();
    editCase(currentCaseId);
}

async function handleDeleteCase() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('caseDetailModal'));
    modal.hide();
    await deleteCase(currentCaseId);
}

// Template Management
async function loadTemplates() {
    try {
        const response = await fetch('/api/templates');
        templates = await response.json();
        
        const templatesDiv = document.getElementById('templatesList');
        if (templates.length === 0) {
            templatesDiv.innerHTML = '<p class="text-muted">No templates uploaded yet.</p>';
        } else {
            templatesDiv.innerHTML = templates.map(t => `
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h6 class="mb-1">
                                    ${t.name}
                                    ${t.is_default ? '<span class="badge bg-success">Default</span>' : ''}
                                </h6>
                                <p class="mb-0 text-muted small">${t.description || 'No description'}</p>
                                <small class="text-muted">Uploaded: ${new Date(t.uploaded_at).toLocaleDateString()}</small>
                            </div>
                            <div class="col-md-4 text-end">
                                ${!t.is_default ? `
                                    <button class="btn btn-sm btn-outline-success me-2" onclick="setDefaultTemplate(${t.id})">
                                        Set as Default
                                    </button>
                                ` : ''}
                                <button class="btn btn-sm btn-danger" onclick="deleteTemplate(${t.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading templates:', error);
    }
}

async function handleTemplateUpload(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('templateName').value);
    formData.append('description', document.getElementById('templateDescription').value);
    formData.append('file', document.getElementById('templateFile').files[0]);
    formData.append('is_default', document.getElementById('templateDefault').checked);
    
    try {
        const response = await fetch('/api/templates', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            document.getElementById('templateForm').reset();
            loadTemplates();
            alert('Template uploaded successfully!');
        } else {
            const error = await response.json();
            alert(error.error || 'Error uploading template.');
        }
    } catch (error) {
        console.error('Error uploading template:', error);
        alert('Error uploading template.');
    }
}

async function setDefaultTemplate(id) {
    try {
        const response = await fetch(`/api/templates/${id}/set-default`, { method: 'POST' });
        
        if (response.ok) {
            loadTemplates();
            alert('Default template updated!');
        } else {
            alert('Error setting default template.');
        }
    } catch (error) {
        console.error('Error setting default template:', error);
        alert('Error setting default template.');
    }
}

async function deleteTemplate(id) {
    if (!confirm('Are you sure you want to delete this template?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/templates/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            loadTemplates();
            alert('Template deleted successfully!');
        } else {
            alert('Error deleting template.');
        }
    } catch (error) {
        console.error('Error deleting template:', error);
        alert('Error deleting template.');
    }
}
