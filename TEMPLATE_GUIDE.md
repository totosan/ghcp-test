# PowerPoint Template Creation Guide

This guide will help you create a PowerPoint template for the Case Study Manager.

## Quick Start

1. Open PowerPoint
2. Design your slides with your company branding
3. Add placeholders (see below)
4. Save as `.pptx`
5. Upload through the Case Study Manager

## Placeholder Syntax

All placeholders must use **double curly braces** like this:

```
{{PLACEHOLDER_NAME}}
```

## Available Placeholders

### Basic Information
- `{{PROJECT_NAME}}` - The name of the project
- `{{CLIENT}}` - Client/customer name
- `{{INDUSTRY}}` - Industry sector (e.g., Healthcare, Finance)
- `{{YEAR}}` - Project year
- `{{PROJECT_VALUE}}` - Project budget/value

### Project Details
- `{{CHALLENGE}}` - The problem or challenge faced
- `{{SOLUTION}}` - The solution you provided
- `{{OUTCOMES}}` - Results and outcomes achieved

### Technical Information
- `{{TECHNOLOGIES}}` - Technologies used (comma-separated)
- `{{TEAM_SIZE}}` - Team size (automatically formatted as "X people")
- `{{DURATION}}` - Project duration (automatically formatted as "X months")

### Additional
- `{{TAGS}}` - Project tags/keywords
- `{{CREATED_BY}}` - Case study author
- `{{EXPORT_DATE}}` - Date when exported (auto-generated)

## Example Slide Layouts

### Slide 1: Title Slide
```
[Your Company Logo]

{{PROJECT_NAME}}

Client: {{CLIENT}}
Industry: {{INDUSTRY}}
Year: {{YEAR}}
```

### Slide 2: Project Overview
```
Project Overview

Client:         {{CLIENT}}
Industry:       {{INDUSTRY}}
Project Value:  {{PROJECT_VALUE}}
Duration:       {{DURATION}}
Team Size:      {{TEAM_SIZE}}
```

### Slide 3: The Challenge
```
The Challenge

{{CHALLENGE}}
```

### Slide 4: Our Solution
```
Our Solution

{{SOLUTION}}

Technologies Used:
{{TECHNOLOGIES}}
```

### Slide 5: Results & Outcomes
```
Results & Outcomes

{{OUTCOMES}}
```

### Slide 6: Summary
```
Project Summary

• Project: {{PROJECT_NAME}}
• Client: {{CLIENT}}
• Duration: {{DURATION}}
• Team: {{TEAM_SIZE}}

Tags: {{TAGS}}
```

## Best Practices

### 1. Placeholder Placement
- Use placeholders in text boxes, tables, or shapes
- Can be used multiple times on same slide
- Can be mixed with regular text

Example:
```
This project for {{CLIENT}} in the {{INDUSTRY}} sector achieved...
```

### 2. Formatting Tips
- Format the placeholder text as you want the output to appear
- Font, size, and color applied to placeholder will be preserved
- Bold/italic formatting will be maintained

### 3. Tables
You can use placeholders in tables:

| Field | Value |
|-------|-------|
| Client | {{CLIENT}} |
| Industry | {{INDUSTRY}} |
| Year | {{YEAR}} |

### 4. Multi-line Content
For longer content (CHALLENGE, SOLUTION, OUTCOMES), ensure the text box is large enough:

```
┌─────────────────────────────────┐
│ The Challenge                    │
│                                  │
│ {{CHALLENGE}}                    │
│                                  │
│                                  │
│                                  │
└─────────────────────────────────┘
```

### 5. Company Branding
- Add your logo (won't be replaced)
- Use your brand colors
- Apply your standard fonts
- Include headers/footers as needed

## Testing Your Template

1. Create a test case study in the system
2. Fill in all fields with sample data
3. Upload your template
4. Export the test case study
5. Review the generated PowerPoint
6. Adjust template as needed

## Common Mistakes to Avoid

❌ **Don't use single braces**: `{CLIENT}` won't work
✅ **Use double braces**: `{{CLIENT}}`

❌ **Don't use spaces**: `{{ CLIENT }}` won't work
✅ **No spaces**: `{{CLIENT}}`

❌ **Watch capitalization**: `{{client}}` won't work
✅ **Use exact names**: `{{CLIENT}}`

❌ **Don't use old .ppt format**
✅ **Use .pptx format**

## Advanced Tips

### Conditional Content
While the system doesn't support true conditionals, you can design slides that work whether data exists or not:

Instead of:
```
Team Size: {{TEAM_SIZE}}
```

Use:
```
Team Size: {{TEAM_SIZE}} (shows "N/A" if not set)
```

### Multiple Templates
Create different templates for:
- Different industries
- Different project types
- Internal vs external audiences
- Short vs detailed presentations

### Reusable Components
Create master slides with your branding, then copy-paste for each slide type.

## Sample Template Structure

A good template might have 6-8 slides:

1. **Title Slide** - Project name, client, year
2. **Overview** - Quick stats and facts
3. **Challenge** - The problem
4. **Solution** - What you did
5. **Technology** - How you did it
6. **Outcomes** - Results achieved
7. **Testimonial** (optional) - Client feedback
8. **Contact** - Your company info

## Need Help?

- View the placeholder guide in the application
- Test with sample data before using for real proposals
- Keep templates simple for best results
- Contact your development team for advanced customization

---

**Ready to create your template? Let's go! 🎨**
