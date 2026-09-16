"""Professional Crow's-foot ER diagram — complaints only (no service requests)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "docs" / "er-diagram.png"

NAVY = "#1B365D"
GOLD = "#B8860B"
WHITE = "#FFFFFF"
BG = "#F4F7FB"
INK = "#1F2A37"
MUTED = "#5B6B7C"
PK = "#0B3A82"
UK = "#0F766E"
FK = "#B45309"
LINE = "#1F3A5F"
PK_BG = "#E8F1FF"
FK_BG = "#FFF6E8"
STROKE = "#1B365D"


def font(size: int, bold: bool = False, mono: bool = False):
    if mono:
        names = (
            ["C:/Windows/Fonts/consolab.ttf", "C:/Windows/Fonts/courbd.ttf"]
            if bold
            else ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/cour.ttf"]
        )
    else:
        names = (
            ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/calibrib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
            if bold
            else ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/calibri.ttf", "C:/Windows/Fonts/arial.ttf"]
        )
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def tw(draw, text, fnt):
    b = draw.textbbox((0, 0), text, font=fnt)
    return b[2] - b[0], b[3] - b[1]


class Box:
    def __init__(self, name, x, y, w, attrs, header=NAVY, index_note=""):
        self.name = name
        self.x, self.y, self.w = x, y, w
        self.attrs = attrs
        self.header = header
        self.index_note = index_note
        self.row_h = 26
        self.header_h = 42
        footer = 28 if index_note else 12
        self.h = self.header_h + 8 + len(attrs) * self.row_h + footer

    @property
    def cx(self):
        return self.x + self.w / 2

    @property
    def left(self):
        return self.x

    @property
    def right(self):
        return self.x + self.w

    @property
    def top(self):
        return self.y

    @property
    def bottom(self):
        return self.y + self.h

    def attr_y(self, i):
        return self.y + self.header_h + 8 + i * self.row_h + self.row_h / 2


def rounded(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def draw_box(draw, box: Box, f_name, f_attr, f_attr_b, f_badge, f_meta):
    x, y, w, h = box.x, box.y, box.w, box.h
    rounded(draw, (x + 3, y + 4, x + w + 3, y + h + 4), 10, fill="#D7DEE8")
    rounded(draw, (x, y, x + w, y + h), 10, fill=WHITE, outline=STROKE, width=2)
    draw.rectangle((x, y, x + w, y + box.header_h), fill=box.header)
    draw.pieslice((x, y, x + 20, y + 20), 180, 270, fill=box.header)
    draw.pieslice((x + w - 20, y, x + w, y + 20), 270, 360, fill=box.header)
    nw, nh = tw(draw, box.name, f_name)
    draw.text((box.cx - nw / 2, y + (box.header_h - nh) / 2 - 1), box.name, fill=WHITE, font=f_name)

    for i, (kind, text) in enumerate(box.attrs):
        ay = box.y + box.header_h + 8 + i * box.row_h
        if kind == "PK":
            draw.rectangle((x + 1, ay, x + w - 1, ay + box.row_h), fill=PK_BG)
        elif kind == "FK":
            draw.rectangle((x + 1, ay, x + w - 1, ay + box.row_h), fill=FK_BG)
        fnt = f_attr_b if kind == "PK" else f_attr
        color = PK if kind == "PK" else (FK if kind == "FK" else INK)
        draw.text((x + 16, ay + 4), text, fill=color, font=fnt)
        if kind in ("PK", "UK", "FK"):
            badge_fill = {"PK": PK, "UK": UK, "FK": FK}[kind]
            bx1 = x + w - 50
            by1 = ay + 5
            rounded(draw, (bx1, by1, bx1 + 34, by1 + 16), 3, fill=badge_fill)
            bw, bh = tw(draw, kind, f_badge)
            draw.text((bx1 + 17 - bw / 2, by1 + 8 - bh / 2 - 1), kind, fill=WHITE, font=f_badge)

    if box.index_note:
        draw.text((x + 16, y + h - 22), box.index_note, fill=MUTED, font=f_meta)


def crow(draw, x, y, toward):
    s = 11
    if toward == "right":
        pts = [(x, y, x + s, y - 7), (x, y, x + s, y), (x, y, x + s, y + 7)]
    elif toward == "left":
        pts = [(x, y, x - s, y - 7), (x, y, x - s, y), (x, y, x - s, y + 7)]
    elif toward == "down":
        pts = [(x, y, x - 7, y + s), (x, y, x, y + s), (x, y, x + 7, y + s)]
    else:
        pts = [(x, y, x - 7, y - s), (x, y, x, y - s), (x, y, x + 7, y - s)]
    for a in pts:
        draw.line(a, fill=LINE, width=2)


def one_bar(draw, x, y, toward):
    if toward in ("left", "right"):
        draw.line((x, y - 8, x, y + 8), fill=LINE, width=2)
    else:
        draw.line((x - 8, y, x + 8, y), fill=LINE, width=2)


def rel_line(draw, pts, dashed=False):
    if not dashed:
        draw.line(pts, fill=LINE, width=2)
        return
    for i in range(len(pts) - 1):
        x1, y1 = pts[i]
        x2, y2 = pts[i + 1]
        length = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5 or 1
        dx, dy = (x2 - x1) / length, (y2 - y1) / length
        pos = 0
        on = True
        while pos < length:
            seg = 7 if on else 5
            end = min(pos + seg, length)
            if on:
                draw.line((x1 + dx * pos, y1 + dy * pos, x1 + dx * end, y1 + dy * end), fill=LINE, width=2)
            pos = end
            on = not on


def label_box(draw, cx, cy, text, fnt):
    w, h = tw(draw, text, fnt)
    pad = 5
    rounded(
        draw,
        (cx - w / 2 - pad, cy - h / 2 - 2, cx + w / 2 + pad, cy + h / 2 + 3),
        4,
        fill=BG,
        outline="#D0D7E2",
    )
    draw.text((cx - w / 2, cy - h / 2 - 1), text, fill=NAVY, font=fnt)


def main():
    W, H = 2280, 1680
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    f_title = font(30, bold=True)
    f_sub = font(16)
    f_meta = font(13)
    f_name = font(16, bold=True)
    f_attr = font(13, mono=True)
    f_attr_b = font(13, bold=True, mono=True)
    f_badge = font(10, bold=True)
    f_rel = font(12, bold=True)
    f_leg = font(13)

    draw.rectangle((0, 0, W, 8), fill=NAVY)
    draw.rectangle((36, 22, 46, 96), fill=GOLD)

    draw.text((64, 24), "Entity-Relationship Diagram", fill=NAVY, font=f_title)
    draw.text(
        (64, 66),
        "Web-Based Citizen Complaint Management System  —  Adama City Administration",
        fill="#3D5266",
        font=f_sub,
    )
    draw.text(
        (64, 90),
        "MongoDB / Mongoose  ·  6 entities  ·  Crow's-foot notation  ·  Complaints only (service requests removed)",
        fill=MUTED,
        font=f_meta,
    )

    dept = Box(
        "DEPARTMENT",
        860,
        128,
        460,
        [
            ("PK", "_id : ObjectId"),
            ("UK", "name : String"),
            ("", "description : String"),
            ("", "isActive : Boolean"),
            ("", "createdAt : Date"),
        ],
        index_note="Index: name (unique)",
    )

    user = Box(
        "USER",
        48,
        400,
        520,
        [
            ("PK", "_id : ObjectId"),
            ("", "fullName : String"),
            ("UK", "email : String"),
            ("", "passwordHash : String"),
            ("", "role : Enum {citizen, admin, officer}"),
            ("", "phoneNumber : String"),
            ("FK", "departmentId : ObjectId  ->  Department"),
            ("", "isActive : Boolean"),
            ("", "resetPasswordToken : String"),
            ("", "resetPasswordExpires : Date"),
            ("", "createdAt : Date"),
            ("", "updatedAt : Date"),
        ],
        index_note="Indexes: email, role, departmentId",
    )

    complaint = Box(
        "COMPLAINT",
        800,
        400,
        580,
        [
            ("PK", "_id : ObjectId"),
            ("UK", "referenceId : String  (CMP-YYYY-####)"),
            ("", "title : String"),
            ("", "description : String"),
            ("", "category : Enum {8 municipal categories}"),
            ("", "location : String"),
            ("", "status : Enum {pending, in_progress,"),
            ("", "           resolved, rejected, closed}"),
            ("FK", "citizenId : ObjectId  ->  User"),
            ("FK", "departmentId : ObjectId  ->  Department"),
            ("FK", "assignedOfficerId : ObjectId  ->  User"),
            ("", "photoUrl : String"),
            ("", "attachmentUrl : String"),
            ("", "resolutionNote : String"),
            ("", "resolvedAt : Date"),
            ("", "createdAt : Date"),
            ("", "updatedAt : Date"),
        ],
        header=GOLD,
        index_note="Indexes: referenceId, citizenId, departmentId, status, createdAt",
    )

    notif = Box(
        "NOTIFICATION",
        48,
        1160,
        520,
        [
            ("PK", "_id : ObjectId"),
            ("FK", "userId : ObjectId  ->  User"),
            ("", "title : String"),
            ("", "message : String"),
            ("", "relatedEntityType : String"),
            ("", "relatedEntityId : ObjectId"),
            ("", "isRead : Boolean"),
            ("", "createdAt : Date"),
        ],
        index_note="Index: (userId, createdAt)",
    )

    history = Box(
        "STATUS HISTORY",
        800,
        1208,
        580,
        [
            ("PK", "_id : ObjectId"),
            ("", "entityType : String  (complaint)"),
            ("FK", "entityId : ObjectId  ->  Complaint"),
            ("", "fromStatus : String"),
            ("", "toStatus : String"),
            ("", "note : String"),
            ("FK", "changedBy : ObjectId  ->  User"),
            ("", "changedAt : Date"),
        ],
        index_note="Index: (entityType, entityId)",
    )

    activity = Box(
        "ACTIVITY LOG",
        1520,
        1160,
        540,
        [
            ("PK", "_id : ObjectId"),
            ("FK", "userId : ObjectId  ->  User"),
            ("", "action : String"),
            ("", "entityType : String"),
            ("", "entityId : ObjectId"),
            ("", "details : String"),
            ("", "createdAt : Date"),
        ],
        index_note="Index: createdAt",
    )

    # Department 1 -- N User (optional; officers only)
    rel_line(draw, [(dept.left, dept.y + 56), (user.cx, dept.y + 56), (user.cx, user.top)], dashed=True)
    one_bar(draw, dept.left + 2, dept.y + 56, "left")
    crow(draw, user.cx, user.top - 1, "down")
    label_box(draw, user.cx + 118, dept.y + 56, "belongs to  (N:1, officers)", f_rel)

    # Department 1 -- N Complaint (optional until assigned)
    rel_line(draw, [(dept.cx, dept.bottom), (dept.cx, complaint.top)], dashed=True)
    one_bar(draw, dept.cx, dept.bottom - 2, "up")
    crow(draw, dept.cx, complaint.top + 1, "down")
    label_box(draw, dept.cx + 78, (dept.bottom + complaint.top) / 2, "handles  (1:N)", f_rel)

    # User submits Complaint (required)
    y_sub = complaint.attr_y(8)
    rel_line(draw, [(user.right, y_sub), (complaint.left, y_sub)])
    one_bar(draw, user.right - 2, y_sub, "left")
    crow(draw, complaint.left + 1, y_sub, "right")
    label_box(draw, (user.right + complaint.left) / 2, y_sub - 16, "submits  (1:N)", f_rel)

    # User assigned to Complaint (optional)
    y_asg = complaint.attr_y(10)
    rel_line(draw, [(user.right, y_asg), (complaint.left, y_asg)], dashed=True)
    one_bar(draw, user.right - 2, y_asg, "left")
    crow(draw, complaint.left + 1, y_asg, "right")
    label_box(draw, (user.right + complaint.left) / 2, y_asg + 16, "is assigned  (1:N, optional)", f_rel)

    # Complaint has StatusHistory
    rel_line(draw, [(complaint.cx, complaint.bottom), (complaint.cx, history.top)])
    one_bar(draw, complaint.cx, complaint.bottom - 2, "up")
    crow(draw, complaint.cx, history.top + 1, "down")
    label_box(draw, complaint.cx + 62, (complaint.bottom + history.top) / 2, "has  (1:N)", f_rel)

    # User receives Notification
    rel_line(draw, [(user.cx, user.bottom), (user.cx, notif.top)])
    one_bar(draw, user.cx, user.bottom - 2, "up")
    crow(draw, user.cx, notif.top + 1, "down")
    label_box(draw, user.cx + 78, (user.bottom + notif.top) / 2, "receives  (1:N)", f_rel)

    # User creates StatusHistory (changedBy) — route along the gap
    gap_x = (user.right + complaint.left) / 2
    rel_line(
        draw,
        [
            (user.right, user.bottom - 36),
            (gap_x, user.bottom - 36),
            (gap_x, history.attr_y(6)),
            (history.left, history.attr_y(6)),
        ],
    )
    one_bar(draw, user.right - 2, user.bottom - 36, "left")
    crow(draw, history.left + 1, history.attr_y(6), "right")
    label_box(draw, gap_x, history.attr_y(6) - 18, "creates  (1:N)", f_rel)

    # User performs ActivityLog — gutter, then above Status History, down into Activity Log
    rail_x = 590
    bridge_y = 1048
    rel_line(
        draw,
        [
            (user.right, user.bottom - 22),
            (rail_x, user.bottom - 22),
            (rail_x, bridge_y),
            (activity.cx, bridge_y),
            (activity.cx, activity.top),
        ],
    )
    one_bar(draw, user.right - 2, user.bottom - 22, "left")
    crow(draw, activity.cx, activity.top + 1, "down")
    label_box(draw, activity.cx, bridge_y - 16, "performs  (1:N)", f_rel)

    for b in (dept, user, complaint, notif, history, activity):
        draw_box(draw, b, f_name, f_attr, f_attr_b, f_badge, f_meta)

    # Legend
    lx, ly, lw, lh = 1520, 128, 540, 248
    rounded(draw, (lx + 3, ly + 4, lx + lw + 3, ly + lh + 4), 10, fill="#D7DEE8")
    rounded(draw, (lx, ly, lx + lw, ly + lh), 10, fill=WHITE, outline="#CBD5E1", width=1)
    draw.text((lx + 18, ly + 12), "Legend", fill=NAVY, font=font(16, bold=True))

    def badge(x, y, kind, fill):
        rounded(draw, (x, y, x + 34, y + 16), 3, fill=fill)
        bw, bh = tw(draw, kind, f_badge)
        draw.text((x + 17 - bw / 2, y + 8 - bh / 2 - 1), kind, fill=WHITE, font=f_badge)

    badge(lx + 18, ly + 48, "PK", PK)
    draw.text((lx + 58, ly + 48), "Primary key", fill=INK, font=f_leg)
    badge(lx + 18, ly + 74, "UK", UK)
    draw.text((lx + 58, ly + 74), "Unique key", fill=INK, font=f_leg)
    badge(lx + 18, ly + 100, "FK", FK)
    draw.text((lx + 58, ly + 100), "Foreign key", fill=INK, font=f_leg)

    draw.line((lx + 250, ly + 56, lx + 320, ly + 56), fill=LINE, width=2)
    draw.text((lx + 328, ly + 48), "Required", fill=INK, font=f_leg)
    x1, yy = lx + 250, ly + 82
    pos, on = 0, True
    while pos < 70:
        seg = 7 if on else 5
        end = min(pos + seg, 70)
        if on:
            draw.line((x1 + pos, yy, x1 + end, yy), fill=LINE, width=2)
        pos = end
        on = not on
    draw.text((lx + 328, ly + 74), "Optional", fill=INK, font=f_leg)

    crow(draw, lx + 34, ly + 140, "down")
    one_bar(draw, lx + 34, ly + 124, "up")
    draw.text((lx + 58, ly + 126), "Crow's foot = many    bar = one", fill=INK, font=f_leg)
    draw.rectangle((lx + 18, ly + 160, lx + 38, ly + 176), fill=GOLD)
    draw.text((lx + 48, ly + 160), "Gold header = central business entity", fill=INK, font=f_leg)
    draw.rectangle((lx + 18, ly + 188, lx + 38, ly + 204), fill=FK_BG, outline=FK)
    draw.text((lx + 48, ly + 188), "Amber row = foreign-key attribute", fill=INK, font=f_leg)
    draw.text((lx + 18, ly + 218), "No Service Request entity in this schema", fill=MUTED, font=f_meta)

    # Enums
    nx, ny = 1520, 400
    rounded(draw, (nx + 3, ny + 4, nx + 540 + 3, ny + 320 + 4), 10, fill="#D7DEE8")
    rounded(draw, (nx, ny, nx + 540, ny + 320), 10, fill=WHITE, outline="#CBD5E1", width=1)
    draw.text((nx + 18, ny + 12), "Controlled values", fill=NAVY, font=font(16, bold=True))
    notes = [
        "User.role:",
        "  citizen, admin, officer",
        "Complaint.status:",
        "  pending, in_progress, resolved,",
        "  rejected, closed",
        "Complaint.category:",
        "  roadMaintenance, wasteManagement,",
        "  waterSupply, streetLighting, drainage,",
        "  publicSafety, noisePollution, other",
        "StatusHistory.entityType: complaint",
        "Department: createdAt only (no updatedAt)",
    ]
    yy = ny + 46
    for line in notes:
        draw.text((nx + 18, yy), line, fill=INK, font=f_attr)
        yy += 22

    foot = "Haramaya University  ·  College of Computing and Informatics  ·  Department of Information Science"
    fw, _ = tw(draw, foot, f_meta)
    draw.text(((W - fw) / 2, H - 34), foot, fill=MUTED, font=f_meta)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG")
    print(f"Wrote {OUT} ({img.size[0]}x{img.size[1]}, {OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
