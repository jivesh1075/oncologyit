"""
OncologyIT Certificate Generator
Generates formal PDF certificates for course completion.
Usage: python generate_certificate.py --name "John Smith" --course "ai-foundations" --score 92 --cert-id "abc123"
"""

import argparse
import os
from datetime import datetime
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Colors
DARK = HexColor('#1a1e2a')
ACCENT = HexColor('#c4421a')
TEAL = HexColor('#0e7c6b')
WARM_BG = HexColor('#faf9f6')
GOLD = HexColor('#b8860b')
GOLD_LIGHT = HexColor('#d4a843')
TEXT_DIM = HexColor('#5a5f72')
BORDER = HexColor('#d0cdc5')


def draw_border(c, width, height, margin=0.5*inch):
    """Draw an elegant double border with corner flourishes."""
    # Outer border
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.rect(margin, margin, width - 2*margin, height - 2*margin)

    # Inner border
    inner = margin + 8
    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(0.5)
    c.rect(inner, inner, width - 2*inner, height - 2*inner)

    # Corner decorations (small squares)
    corner_size = 12
    corners = [
        (margin - 2, margin - 2),
        (width - margin - corner_size + 2, margin - 2),
        (margin - 2, height - margin - corner_size + 2),
        (width - margin - corner_size + 2, height - margin - corner_size + 2),
    ]
    c.setFillColor(GOLD)
    for x, y in corners:
        c.rect(x, y, corner_size, corner_size, fill=1)

    # Decorative lines at top and bottom center
    center_x = width / 2
    line_w = 120

    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    # Top decoration
    top_y = height - margin - 20
    c.line(center_x - line_w, top_y, center_x + line_w, top_y)
    c.setLineWidth(0.3)
    c.line(center_x - line_w + 20, top_y - 4, center_x + line_w - 20, top_y - 4)

    # Bottom decoration
    bot_y = margin + 20
    c.setLineWidth(1)
    c.line(center_x - line_w, bot_y, center_x + line_w, bot_y)
    c.setLineWidth(0.3)
    c.line(center_x - line_w + 20, bot_y + 4, center_x + line_w - 20, bot_y + 4)


def generate_certificate(name, course_title, score, cert_id, output_path):
    """Generate a formal certificate PDF."""
    width, height = landscape(letter)
    c = canvas.Canvas(output_path, pagesize=landscape(letter))

    # Background
    c.setFillColor(WARM_BG)
    c.rect(0, 0, width, height, fill=1)

    # Border
    draw_border(c, width, height)

    center_x = width / 2

    # Organization mark
    y = height - 1.3 * inch
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(center_x, y, "ONCOLOGYIT.COM")

    # "Certificate of Completion" header
    y -= 0.55 * inch
    c.setFillColor(DARK)
    c.setFont("Helvetica", 11)
    c.drawCentredString(center_x, y, "C E R T I F I C A T E    O F    C O M P L E T I O N")

    # Decorative rule
    y -= 0.25 * inch
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(center_x - 80, y, center_x + 80, y)

    # "This certifies that"
    y -= 0.45 * inch
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 10)
    c.drawCentredString(center_x, y, "This is to certify that")

    # Recipient name
    y -= 0.55 * inch
    c.setFillColor(DARK)
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(center_x, y, name)

    # Underline under name
    name_width = c.stringWidth(name, "Helvetica-Bold", 28)
    y -= 6
    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(0.5)
    c.line(center_x - name_width/2 - 20, y, center_x + name_width/2 + 20, y)

    # "has successfully completed"
    y -= 0.4 * inch
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 10)
    c.drawCentredString(center_x, y, "has successfully completed the certification program")

    # Course title
    y -= 0.5 * inch
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(center_x, y, course_title)

    # Score and details
    y -= 0.4 * inch
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 9)
    c.drawCentredString(center_x, y, f"Examination Score: {score}%   |   Passing Threshold: 80%")

    # Date
    y -= 0.2 * inch
    date_str = datetime.now().strftime("%B %d, %Y")
    c.drawCentredString(center_x, y, f"Awarded: {date_str}")

    # Signature area
    y -= 0.7 * inch
    sig_left = center_x - 2.2 * inch
    sig_right = center_x + 2.2 * inch

    # Left signature
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(sig_left - 1*inch, y, sig_left + 1*inch, y)
    c.setFillColor(DARK)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(sig_left, y - 14, "Jivesh Sharma, M.D.")
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 7)
    c.drawCentredString(sig_left, y - 26, "Medical Oncologist | CEO, Nexgen Precision")
    c.drawCentredString(sig_left, y - 36, "Course Director")

    # Right signature
    c.setStrokeColor(BORDER)
    c.line(sig_right - 1*inch, y, sig_right + 1*inch, y)
    c.setFillColor(DARK)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(sig_right, y - 14, "OncologyIT.com")
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 7)
    c.drawCentredString(sig_right, y - 26, "Professional Certification Program")
    c.drawCentredString(sig_right, y - 36, "Est. 2026")

    # Verification ID (bottom)
    y = 0.75 * inch
    c.setFillColor(TEXT_DIM)
    c.setFont("Helvetica", 7)
    c.drawCentredString(center_x, y, f"Certificate ID: {cert_id}   |   Verify at oncologyit.com/verify/{cert_id}")

    c.save()
    print(f"Certificate generated: {output_path}")
    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate OncologyIT certificate")
    parser.add_argument("--name", required=True, help="Recipient name")
    parser.add_argument("--course", default="ai-foundations", help="Course ID")
    parser.add_argument("--course-title", default="Foundations of AI in Healthcare", help="Course title")
    parser.add_argument("--score", type=int, required=True, help="Exam score")
    parser.add_argument("--cert-id", required=True, help="Certificate UUID")
    parser.add_argument("--output", default=None, help="Output file path")

    args = parser.parse_args()

    if args.output is None:
        safe_name = args.name.replace(" ", "_").lower()
        args.output = f"certificate_{safe_name}_{args.cert_id[:8]}.pdf"

    generate_certificate(
        name=args.name,
        course_title=args.course_title,
        score=args.score,
        cert_id=args.cert_id,
        output_path=args.output,
    )
