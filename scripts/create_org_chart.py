"""
Create Organizational Chart for Adama City Administration Science and Technology Office
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.lines as mlines

def create_org_chart():
    # Create figure
    fig, ax = plt.subplots(1, 1, figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Colors
    color_top = '#003366'  # Dark blue
    color_level2 = '#0066CC'  # Medium blue
    color_level3 = '#3399FF'  # Light blue
    text_color = 'white'
    
    # Top Level - Adama City Administration
    top_box = FancyBboxPatch((3.5, 8.5), 7, 1, 
                              boxstyle="round,pad=0.1", 
                              edgecolor='black', 
                              facecolor=color_top, 
                              linewidth=2)
    ax.add_patch(top_box)
    ax.text(7, 9, 'ADAMA CITY ADMINISTRATION', 
            ha='center', va='center', 
            fontsize=14, fontweight='bold', color=text_color)
    
    # Arrow down
    arrow1 = FancyArrowPatch((7, 8.5), (7, 7.5),
                            arrowstyle='->', 
                            mutation_scale=30, 
                            linewidth=2.5,
                            color='black')
    ax.add_patch(arrow1)
    
    # Second Level - Science and Technology Office
    office_box = FancyBboxPatch((2.5, 6.5), 9, 1, 
                                boxstyle="round,pad=0.1", 
                                edgecolor='black', 
                                facecolor=color_level2, 
                                linewidth=2)
    ax.add_patch(office_box)
    ax.text(7, 7, 'SCIENCE AND TECHNOLOGY OFFICE', 
            ha='center', va='center', 
            fontsize=13, fontweight='bold', color=text_color)
    
    # Arrow down splitting into two
    arrow2 = FancyArrowPatch((7, 6.5), (7, 5.8),
                            arrowstyle='-', 
                            linewidth=2.5,
                            color='black')
    ax.add_patch(arrow2)
    
    # Horizontal line for split
    line = mlines.Line2D([3.5, 10.5], [5.8, 5.8], linewidth=2.5, color='black')
    ax.add_line(line)
    
    # Arrows down from split
    arrow3 = FancyArrowPatch((4.5, 5.8), (4.5, 5),
                            arrowstyle='->', 
                            mutation_scale=30, 
                            linewidth=2.5,
                            color='black')
    ax.add_patch(arrow3)
    
    arrow4 = FancyArrowPatch((9.5, 5.8), (9.5, 5),
                            arrowstyle='->', 
                            mutation_scale=30, 
                            linewidth=2.5,
                            color='black')
    ax.add_patch(arrow4)
    
    # Third Level - Two main divisions
    # Administrative Functions
    admin_box = FancyBboxPatch((1.5, 3.8), 6, 1.2, 
                               boxstyle="round,pad=0.1", 
                               edgecolor='black', 
                               facecolor=color_level3, 
                               linewidth=2)
    ax.add_patch(admin_box)
    ax.text(4.5, 4.4, 'ADMINISTRATIVE', 
            ha='center', va='center', 
            fontsize=12, fontweight='bold', color='black')
    ax.text(4.5, 3.9, 'FUNCTIONS', 
            ha='center', va='center', 
            fontsize=11, fontweight='bold', color='black')
    
    # Technical/ICT Functions
    tech_box = FancyBboxPatch((6.5, 3.8), 6, 1.2, 
                              boxstyle="round,pad=0.1", 
                              edgecolor='black', 
                              facecolor=color_level3, 
                              linewidth=2)
    ax.add_patch(tech_box)
    ax.text(9.5, 4.4, 'TECHNICAL / ICT', 
            ha='center', va='center', 
            fontsize=12, fontweight='bold', color='black')
    ax.text(9.5, 3.9, 'FUNCTIONS', 
            ha='center', va='center', 
            fontsize=11, fontweight='bold', color='black')
    
    # Arrow down from Technical/ICT
    arrow5 = FancyArrowPatch((9.5, 3.8), (9.5, 2.8),
                            arrowstyle='->', 
                            mutation_scale=30, 
                            linewidth=2.5,
                            color='black')
    ax.add_patch(arrow5)
    
    # Fourth Level - Software Development (under Technical/ICT)
    dev_box = FancyBboxPatch((7, 1.5), 5, 1.3, 
                             boxstyle="round,pad=0.1", 
                             edgecolor='black', 
                             facecolor='#66CCFF', 
                             linewidth=2)
    ax.add_patch(dev_box)
    ax.text(9.5, 2.5, 'SOFTWARE DEVELOPMENT', 
            ha='center', va='center', 
            fontsize=11, fontweight='bold', color='black')
    ax.text(9.5, 2.0, 'UNIT', 
            ha='center', va='center', 
            fontsize=10, fontweight='bold', color='black')
    ax.text(9.5, 1.7, '(Web & Mobile Applications)', 
            ha='center', va='center', 
            fontsize=8, style='italic', color='black')
    
    # Administrative sub-items (bullet list)
    admin_items = [
        '• Office Management',
        '• HR & Personnel',
        '• Budget & Finance',
        '• Planning & Reporting'
    ]
    y_pos = 3.3
    for item in admin_items:
        ax.text(1.8, y_pos, item, 
                ha='left', va='center', 
                fontsize=8, color='black')
        y_pos -= 0.25
    
    # Technical sub-items (bullet list)
    tech_items = [
        '• Infrastructure Management',
        '• Network Administration',
        '• Database Management',
        '• Technical Support'
    ]
    y_pos = 3.3
    for item in tech_items:
        ax.text(6.8, y_pos, item, 
                ha='left', va='center', 
                fontsize=8, color='black')
        y_pos -= 0.25
    
    # Add title
    ax.text(7, 9.8, 'Organizational Structure', 
            ha='center', va='center', 
            fontsize=16, fontweight='bold', color='black')
    
    # Add footer note
    ax.text(7, 0.8, 'Note: Software Development Unit is responsible for the', 
            ha='center', va='center', 
            fontsize=8, style='italic', color='gray')
    ax.text(7, 0.5, 'Web-Based Citizen Complaint Management System Project', 
            ha='center', va='center', 
            fontsize=8, style='italic', color='gray')
    
    # Save figure
    plt.tight_layout()
    output_path = 'c:/Users/Hp/Desktop/Citizen/org_chart.png'
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"✅ Organizational chart created successfully!")
    print(f"📍 Saved to: {output_path}")
    
    # Also save as high-quality PDF
    pdf_path = 'c:/Users/Hp/Desktop/Citizen/org_chart.pdf'
    plt.savefig(pdf_path, format='pdf', bbox_inches='tight', facecolor='white')
    print(f"📍 PDF version: {pdf_path}")
    
    plt.close()

if __name__ == "__main__":
    try:
        create_org_chart()
        print("\n✨ Image is ready to use in your report!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
