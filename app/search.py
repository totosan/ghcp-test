from sqlalchemy import or_, and_
from app.models import CaseStudy

class SearchService:
    """Handle search and filtering of case studies"""
    
    @staticmethod
    def search(query=None, industry=None, year=None, technologies=None, tags=None, 
               confidential=None, sort_by='updated_at', sort_order='desc'):
        """
        Search case studies with various filters
        
        Args:
            query: Text search query
            industry: Filter by industry
            year: Filter by project year
            technologies: Filter by technology (partial match)
            tags: Filter by tag (partial match)
            confidential: Filter by confidential status
            sort_by: Field to sort by
            sort_order: 'asc' or 'desc'
        """
        # Start with base query
        results = CaseStudy.query
        
        # Apply filters
        filters = []
        
        # Text search across multiple fields
        if query:
            search_term = f"%{query}%"
            filters.append(
                or_(
                    CaseStudy.project_name.ilike(search_term),
                    CaseStudy.client_name.ilike(search_term),
                    CaseStudy.challenge.ilike(search_term),
                    CaseStudy.solution.ilike(search_term),
                    CaseStudy.outcomes.ilike(search_term),
                    CaseStudy.technologies.ilike(search_term),
                    CaseStudy.tags.ilike(search_term)
                )
            )
        
        # Industry filter
        if industry:
            filters.append(CaseStudy.industry.ilike(f"%{industry}%"))
        
        # Year filter
        if year:
            filters.append(CaseStudy.project_year == int(year))
        
        # Technology filter
        if technologies:
            filters.append(CaseStudy.technologies.ilike(f"%{technologies}%"))
        
        # Tag filter
        if tags:
            filters.append(CaseStudy.tags.ilike(f"%{tags}%"))
        
        # Confidential filter
        if confidential is not None:
            filters.append(CaseStudy.confidential == confidential)
        
        # Apply all filters
        if filters:
            results = results.filter(and_(*filters))
        
        # Apply sorting
        if hasattr(CaseStudy, sort_by):
            sort_column = getattr(CaseStudy, sort_by)
            if sort_order == 'desc':
                results = results.order_by(sort_column.desc())
            else:
                results = results.order_by(sort_column.asc())
        
        return results.all()
    
    @staticmethod
    def get_facets():
        """Get facets for filtering (industries, years, technologies)"""
        from sqlalchemy import func
        from app import db
        
        # Get unique industries
        industries = db.session.query(
            CaseStudy.industry,
            func.count(CaseStudy.id).label('count')
        ).filter(
            CaseStudy.industry.isnot(None)
        ).group_by(
            CaseStudy.industry
        ).all()
        
        # Get unique years
        years = db.session.query(
            CaseStudy.project_year,
            func.count(CaseStudy.id).label('count')
        ).filter(
            CaseStudy.project_year.isnot(None)
        ).group_by(
            CaseStudy.project_year
        ).order_by(
            CaseStudy.project_year.desc()
        ).all()
        
        return {
            'industries': [{'name': ind, 'count': count} for ind, count in industries if ind],
            'years': [{'year': year, 'count': count} for year, count in years if year]
        }
