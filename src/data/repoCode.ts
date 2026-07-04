export interface RepoFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}

export const repoCodeFiles: RepoFile[] = [
  {
    name: "LICENSE",
    path: "LICENSE",
    language: "plaintext",
    description: "Licença Apache 2.0 padrão para o projeto open-source.",
    content: `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.
      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.
      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.
      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity.
      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.
      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.
      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.
      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work.
      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship.
      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner.
      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:
      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and
      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and
      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and
      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work, including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses, even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS
`
  },
  {
    name: "pyproject.toml",
    path: "pyproject.toml",
    language: "toml",
    description: "Configuração do projeto Python moderna usando Poetry / PEP 621 e especificações pyapp.",
    content: `[project]
name = "qrcodando"
version = "1.0.0"
description = "Gerador de QR Codes artísticos e altamente customizáveis com PySide6"
authors = [
    { name = "Tiago Rabelo", email = "tiagorabelosels@gmail.com" }
]
license = { text = "Apache-2.0" }
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "PySide6>=6.6.0",
    "qrcode[pil]>=7.4.2",
    "pillow>=10.2.0",
    "numpy>=1.26.0",
    "opencv-python>=4.9.0.80"
]

[project.gui-scripts]
qrcodando = "gui.app:main"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"

# Configurações de empacotamento com pyapp
[tool.pyapp]
package = "qrcodando"
entry-point = "gui.app:main"
`
  },
  {
    name: "requirements.txt",
    path: "requirements.txt",
    language: "plaintext",
    description: "Dependências diretas para instalação simplificada via pip.",
    content: `PySide6==6.6.1
qrcode[pil]==7.4.2
pillow==10.2.0
numpy==1.26.2
opencv-python==4.9.0.80
`
  },
  {
    name: "core/generator.py",
    path: "core/generator.py",
    language: "python",
    description: "Lógica matemática e processamento de matriz de QR Code. Implementa o contorno orgânico de logos e correção Reed-Solomon H.",
    content: `"""
Qrcodando - Núcleo de Geração de QR Code Artístico
Desenvolvido sob Licença Apache 2.0 por Tiago Rabelo
"""
import qrcode
import numpy as np
from PIL import Image, ImageDraw, ImageOps
import math

class ArtisticQRGenerator:
    """
    Motor principal do Qrcodando. Gera e estiliza matrizes de QR Code.
    Força correção Reed-Solomon no nível H (High - 30% de tolerância a perdas)
    para viabilizar customizações visuais e invasão orgânica de logos.
    """
    def __init__(self, data_str: str):
        self.data_str = data_str
        # Força o nível máximo de correção Reed-Solomon: H (30%)
        self.qr = qrcode.QRCode(
            version=None,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        self.qr.add_data(self.data_str)
        self.qr.make(fit=True)
        self.matrix = self.qr.get_matrix()
        self.size = len(self.matrix)

    def get_matrix_array(self):
        """Retorna representação Booleana (True = Preto/Dado, False = Branco/Vazio)."""
        return np.array(self.matrix, dtype=bool)

    @staticmethod
    def calculate_contrast_ratio(fg_rgb: tuple, bg_rgb: tuple) -> float:
        """
        Calcula a razão de contraste entre duas cores com base na luminância WCAG.
        Fórmula: (L1 + 0.05) / (L2 + 0.05) onde L1 é a maior luminância.
        """
        def get_luminance(rgb):
            colors = []
            for c in rgb:
                val = c / 255.0
                if val <= 0.03928:
                    colors.append(val / 12.92)
                else:
                    colors.append(((val + 0.055) / 1.055) ** 2.4)
            return 0.2126 * colors[0] + 0.7152 * colors[1] + 0.0722 * colors[2]

        l1 = get_luminance(fg_rgb)
        l2 = get_luminance(bg_rgb)
        
        brightest = max(l1, l2)
        darkest = min(l1, l2)
        return (brightest + 0.05) / (darkest + 0.05)

    def generate_styled_image(
        self,
        shape_style="circle",
        fg_color=(24, 24, 37),      # RGB Hex: #181825
        bg_color=(255, 255, 255),  # RGB Hex: #FFFFFF
        gradient_mode="solid",     # "solid" | "radial"
        gradient_color=None,       # RGB complementar para radial
        logo_path=None,
        padding_ratio=1.4
    ) -> Image.Image:
        """
        Cria a imagem final do QR Code estilizando as células e contornando
        organicamente o logo centralizado respeitando o canal alpha.
        """
        box_size = 20
        border_modules = 4
        border_px = border_modules * box_size
        img_width = self.size * box_size + (2 * border_px)

        # 1. Desenhar o plano de fundo (Sólido ou Gradiente Radial)
        base_img = Image.new("RGBA", (img_width, img_width), (0, 0, 0, 0))
        bg_layer = Image.new("RGBA", (img_width, img_width), bg_color + (255,))
        
        if gradient_mode == "radial" and gradient_color:
            # Renderiza um gradiente radial do centro para as bordas
            draw_bg = ImageDraw.Draw(bg_layer)
            center_x, center_y = img_width / 2, img_width / 2
            max_radius = math.hypot(center_x, center_y)
            
            # Interpolação radial de cores
            for r in range(int(max_radius), 0, -10):
                factor = r / max_radius
                # Interpolação linear simples
                r_c = int(fg_color[0] * (1 - factor) + gradient_color[0] * factor)
                g_c = int(fg_color[1] * (1 - factor) + gradient_color[1] * factor)
                b_c = int(fg_color[2] * (1 - factor) + gradient_color[2] * factor)
                draw_bg.ellipse(
                    [center_x - r, center_y - r, center_x + r, center_y + r],
                    fill=(r_c, g_c, b_c, 255)
                )

        base_img.alpha_composite(bg_layer)
        draw = ImageDraw.Draw(base_img)

        # 2. Carregar logo e gerar máscara de colisão orgânica
        logo = None
        logo_mask = None
        logo_bbox = None
        
        if logo_path:
            try:
                logo = Image.open(logo_path).convert("RGBA")
                # Redimensiona mantendo proporções (Máximo 25% da área total)
                max_logo_w = int(img_width * 0.26)
                logo.thumbnail((max_logo_w, max_logo_w))
                
                logo_w, logo_h = logo.size
                logo_x = int((img_width - logo_w) / 2)
                logo_y = int((img_width - logo_h) / 2)
                logo_bbox = (logo_x, logo_y, logo_x + logo_w, logo_y + logo_h)
                
                # Obtém o canal alpha para contorno orgânico
                _, _, _, alpha = logo.split()
                logo_mask = alpha
            except Exception as e:
                print(f"Erro ao carregar o logo para evasão orgânica: {e}")

        # 3. Desenhar Células (Módulos) com Dodge de Colisão
        modules_drawn = 0
        modules_total = sum(sum(row) for row in self.matrix)
        modules_skipped = 0

        for r_idx, row in enumerate(self.matrix):
            for c_idx, val in enumerate(row):
                if not val:
                    continue

                # Coordenadas do bloco
                x0 = border_px + (c_idx * box_size)
                y0 = border_px + (r_idx * box_size)
                x1 = x0 + box_size
                y1 = y0 + box_size
                cx, cy = (x0 + x1) / 2, (y0 + y1) / 2

                # --- ALGORITMO DE INVASÃO ORGÂNICA (Collision Dodge) ---
                if logo and logo_mask and logo_bbox:
                    lx_start, ly_start, lx_end, ly_end = logo_bbox
                    # Se o módulo está dentro do quadrado delimitador do logo
                    if lx_start <= cx <= lx_end and ly_start <= cy <= ly_end:
                        # Coordenada local no espaço de pixels do logo
                        local_x = int(cx - lx_start)
                        local_y = int(cy - ly_start)
                        
                        # Verifica se o pixel ou vizinhos próximos no canal alpha são opacos
                        padding_px = int(box_size * padding_ratio)
                        is_colliding = False
                        
                        for dy in range(-padding_px, padding_px + 1):
                            for dx in range(-padding_px, padding_px + 1):
                                test_x = local_x + dx
                                test_y = local_y + dy
                                if 0 <= test_x < logo_w and 0 <= test_y < logo_h:
                                    alpha_val = logo_mask.getpixel((test_x, test_y))
                                    if alpha_val > 40:  # Sensibilidade de opacidade (0-255)
                                        is_colliding = True
                                        break
                            if is_colliding:
                                break
                        
                        if is_colliding:
                            modules_skipped += 1
                            continue # Pula a renderização deste ponto!

                # Evita distorcer os Finder Patterns nos 3 cantos (essencial para escaneabilidade)
                is_finder = (
                    (r_idx < 8 and c_idx < 8) or
                    (r_idx < 8 and c_idx >= self.size - 8) or
                    (r_idx >= self.size - 8 and c_idx < 8)
                )

                if is_finder:
                    # Desenha de forma cheia e quadrada clássica
                    draw.rectangle([x0, y0, x1, y1], fill=fg_color + (255,))
                else:
                    # Desenho Estilizado Customizado
                    if shape_style == "square":
                        draw.rectangle([x0 + 1, y0 + 1, x1 - 1, y1 - 1], fill=fg_color + (255,))
                    
                    elif shape_style == "circle":
                        draw.ellipse([x0 + 2, y0 + 2, x1 - 2, y1 - 2], fill=fg_color + (255,))
                    
                    elif shape_style == "heart":
                        # Formato de Coração Vetorial Simulado
                        # Metades superiores arredondadas e bico inferior
                        draw.ellipse([x0 + 1, y0 + 2, cx, cy], fill=fg_color + (255,))
                        draw.ellipse([cx, y0 + 2, x1 - 1, cy], fill=fg_color + (255,))
                        draw.polygon([x0 + 1, cy, cx, y1 - 1, x1 - 1, cy], fill=fg_color + (255,))
                        
                    elif shape_style == "star":
                        # Estrela de 4 pontas geométrica
                        points = [
                            (cx, y0), (cx + box_size*0.18, cy - box_size*0.18),
                            (x1, cy), (cx + box_size*0.18, cy + box_size*0.18),
                            (cx, y1), (cx - box_size*0.18, cy + box_size*0.18),
                            (x0, cy), (cx - box_size*0.18, cy - box_size*0.18)
                        ]
                        draw.polygon(points, fill=fg_color + (255,))
                        
                    elif shape_style == "connected":
                        # Conexão contínua com adjacentes
                        has_up = r_idx > 0 and self.matrix[r_idx - 1][c_idx]
                        has_down = r_idx < self.size - 1 and self.matrix[r_idx + 1][c_idx]
                        has_left = c_idx > 0 and self.matrix[r_idx][c_idx - 1]
                        has_right = c_idx < self.size - 1 and self.matrix[r_idx][c_idx + 1]
                        
                        # Célula central redonda
                        draw.ellipse([cx - box_size*0.35, cy - box_size*0.35, cx + box_size*0.35, cy + box_size*0.35], fill=fg_color + (255,))
                        
                        # Pontes retangulares de conexão
                        if has_up:
                            draw.rectangle([cx - box_size*0.25, y0, cx + box_size*0.25, cy], fill=fg_color + (255,))
                        if has_down:
                            draw.rectangle([cx - box_size*0.25, cy, cx + box_size*0.25, y1], fill=fg_color + (255,))
                        if has_left:
                            draw.rectangle([x0, cy - box_size*0.25, cx, cy + box_size*0.25], fill=fg_color + (255,))
                        if has_right:
                            draw.rectangle([cx, cy - box_size*0.25, x1, cy + box_size*0.25], fill=fg_color + (255,))

                modules_drawn += 1

        # 4. Avaliação de Redundância de Segurança (Reed-Solomon H Limit Check)
        loss_pct = (modules_skipped / modules_total) * 100 if modules_total > 0 else 0
        if loss_pct > 30.0:
            # Emite alerta crítico de que o QR pode ficar ilegível
            print(f"[ALERTA CRÍTICO] Qrcodando: A evasão do logo suprimiu {loss_pct:.1f}% dos dados. Limite H (30%) excedido!")
        
        # 5. Mesclar Logo centralizado por cima da imagem tratada
        if logo and logo_bbox:
            lx_start, ly_start, _, _ = logo_bbox
            base_img.alpha_composite(logo, (lx_start, ly_start))

        return base_img
`
  },
  {
    name: "gui/app.py",
    path: "gui/app.py",
    language: "python",
    description: "Interface gráfica em PySide6. Contém estilizações QSS personalizadas em Dark Mode, visualizador de contraste WCAG, seletores de cores e renderizador de canvas.",
    content: `"""
Qrcodando - Interface Gráfica Principal (PySide6)
Desenvolvido sob Licença Apache 2.0 por Tiago Rabelo
"""
import sys
import os
from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QLabel, QLineEdit, QPushButton, QComboBox, QSlider, QFileDialog,
    QColorDialog, QFrame, QGridLayout, QMessageBox
)
from PySide6.QtGui import QPixmap, QColor, QFont, QIcon, QPainter, QRadialGradient, QBrush
from PySide6.QtCore import Qt, QSize, Slot

# Certifique-se de que o diretório pai esteja no path para importar o core
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from core.generator import ArtisticQRGenerator

class QSSStyles:
    """Design System do Qrcodando codificado em Qt Style Sheets (Dark Theme)"""
    MAIN_THEME = """
    QMainWindow {
        background-color: #0F0F16;
    }
    QWidget {
        color: #E2E8F0;
        font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
    }
    QLabel {
        font-size: 13px;
        font-weight: 500;
    }
    QLineEdit {
        background-color: #1A1A24;
        border: 2px solid #2B2D42;
        border-radius: 8px;
        padding: 10px 12px;
        color: #FFFFFF;
        font-size: 14px;
    }
    QLineEdit:focus {
        border: 2px solid #8A2BE2;
    }
    QComboBox {
        background-color: #1A1A24;
        border: 2px solid #2B2D42;
        border-radius: 8px;
        padding: 8px 12px;
        min-width: 150px;
        font-size: 13px;
    }
    QComboBox::drop-down {
        border: none;
    }
    QPushButton {
        background-color: #8A2BE2;
        border: none;
        border-radius: 8px;
        color: #FFFFFF;
        padding: 10px 20px;
        font-weight: 600;
        font-size: 13px;
    }
    QPushButton:hover {
        background-color: #9D4EDD;
    }
    QPushButton:pressed {
        background-color: #7B2CBF;
    }
    QFrame#CardPanel {
        background-color: #15151F;
        border-radius: 12px;
        border: 1px solid #232333;
    }
    QSlider::groove:horizontal {
        height: 6px;
        background: #1A1A24;
        border-radius: 3px;
    }
    QSlider::handle:horizontal {
        background: #8A2BE2;
        width: 16px;
        margin-top: -5px;
        margin-bottom: -5px;
        border-radius: 8px;
    }
    """

class CustomColorWheel(QFrame):
    """
    Simulação ou representação de um Color Wheel interativo no PySide6.
    Permite selecionar cores RGB arrastando ou clicando em um gradiente.
    """
    def __init__(self, parent=None, on_color_changed=None):
        super().__init__(parent)
        self.setFixedSize(160, 160)
        self.on_color_changed = on_color_changed
        self.current_color = QColor(138, 43, 226) # Roxo de fábrica
        self.setCursor(Qt.CrossCursor)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        # Desenha uma roda de cores usando gradientes radiais empilhados
        rect = self.rect()
        gradient = QRadialGradient(rect.center(), rect.width() / 2)
        gradient.setColorAt(0, Qt.white)
        gradient.setColorAt(0.5, self.current_color)
        gradient.setColorAt(1, Qt.black)
        
        painter.setBrush(QBrush(gradient))
        painter.setPen(Qt.NoPen)
        painter.drawEllipse(rect)
        
        # Desenha o anel indicador de seleção
        painter.setPen(QBrush(Qt.white))
        painter.setBrush(Qt.NoBrush)
        painter.drawEllipse(rect.center(), 6, 6)

    def mousePressEvent(self, event):
        self.select_color_at(event.pos())

    def mouseMoveEvent(self, event):
        self.select_color_at(event.pos())

    def select_color_at(self, pos):
        # Simula seleção de cor baseada no clique
        # Para simplificar na GUI nativa do PySide6, abre-se o QColorDialog ou
        # interpola-se o gradiente. Aqui emite-se a mudança de cor.
        factor = (pos.x() / self.width() + pos.y() / self.height()) / 2
        r = int(255 * factor)
        g = int(120 * (1 - factor))
        b = int(255 * (1 - factor))
        self.current_color = QColor(r, g, b)
        self.update()
        if self.on_color_changed:
            self.on_color_changed(self.current_color)

class QrcodandoApp(QMainWindow):
    """Janela Principal da aplicação Qrcodando."""
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Qrcodando - Gerador de QR Codes Artísticos")
        self.resize(1100, 750)
        self.setStyleSheet(QSSStyles.MAIN_THEME)
        
        # Variáveis de Estado
        self.fg_color_rgb = (138, 43, 226)   # #8A2BE2
        self.bg_color_rgb = (15, 15, 22)     # Dark background
        self.selected_logo_path = None
        self.current_qr_path = "preview_temp.png"

        self.setup_ui()
        self.update_qr_preview()

    def setup_ui(self):
        # Widget Central e Layout Principal
        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(25, 25, 25, 25)
        main_layout.setSpacing(15)

        # ------------------- HEADER -------------------
        header_layout = QHBoxLayout()
        
        title_label = QLabel("QRCODANDO", self)
        title_label.setStyleSheet("font-size: 24px; font-weight: 800; color: #8A2BE2; font-family: 'Space Grotesk'; letter-spacing: 2px;")
        
        # MÁXIMA IMPORTÂNCIA: Exibição elegante "Feito por Tiago Rabelo"
        by_label = QLabel("Feito por Tiago Rabelo", self)
        by_label.setStyleSheet("font-size: 13px; font-weight: 600; color: #64748B; font-style: italic;")
        
        header_layout.addWidget(title_label)
        header_layout.addStretch()
        header_layout.addWidget(by_label)
        
        main_layout.addLayout(header_layout)

        # Divisor
        line = QFrame()
        line.setFrameShape(QFrame.HLine)
        line.setStyleSheet("background-color: #232333; max-height: 1px; border: none;")
        main_layout.addWidget(line)

        # ------------------- WORKSPACE GRID -------------------
        workspace_layout = QHBoxLayout()
        workspace_layout.setSpacing(20)

        # --- PAINEL DE CONTROLE (Esquerdo) ---
        control_panel = QFrame()
        control_panel.setObjectName("CardPanel")
        control_panel.setStyleSheet(QSSStyles.MAIN_THEME)
        control_layout = QVBoxLayout(control_panel)
        control_layout.setContentsMargins(20, 20, 20, 20)
        control_layout.setSpacing(15)

        # URL / Texto Entrada
        control_layout.addWidget(QLabel("CONTEÚDO DO QR CODE (URL ou Texto)"))
        self.input_text = QLineEdit("https://github.com/HonoravelMacho/qrcodando")
        self.input_text.textChanged.connect(self.update_qr_preview)
        control_layout.addWidget(self.input_text)

        # Estilo das Células
        control_layout.addWidget(QLabel("ESTILO DOS MÓDULOS (PONTOS)"))
        self.combo_style = QComboBox()
        self.combo_style.addItems(["Círculos", "Quadrados", "Corações", "Estrelas", "Linhas Conectadas"])
        self.combo_style.currentIndexChanged.connect(self.update_qr_preview)
        control_layout.addWidget(self.combo_style)

        # Configurações de Cores
        colors_grid = QGridLayout()
        
        # Seletor de Cor do QR (Foreground)
        colors_grid.addWidget(QLabel("Cor do QR (Foreground)"), 0, 0)
        self.btn_fg_color = QPushButton("Selecionar")
        self.btn_fg_color.setStyleSheet("background-color: #8A2BE2; min-height: 35px;")
        self.btn_fg_color.clicked.connect(self.select_fg_color)
        colors_grid.addWidget(self.btn_fg_color, 1, 0)

        # Seletor de Cor de Fundo
        colors_grid.addWidget(QLabel("Cor de Fundo"), 0, 1)
        self.btn_bg_color = QPushButton("Selecionar")
        self.btn_bg_color.setStyleSheet("background-color: #1A1A24; border: 1px solid #2B2D42;")
        self.btn_bg_color.clicked.connect(self.select_bg_color)
        colors_grid.addWidget(self.btn_bg_color, 1, 1)
        
        control_layout.addLayout(colors_grid)

        # Widget de Roda de Cores Interativa Integrada
        control_layout.addWidget(QLabel("RODA DE CORES INTERATIVA (TINTA DIGITAL)"))
        self.color_wheel = CustomColorWheel(self, on_color_changed=self.color_wheel_changed)
        wheel_centering = QHBoxLayout()
        wheel_centering.addStretch()
        wheel_centering.addWidget(self.color_wheel)
        wheel_centering.addStretch()
        control_layout.addLayout(wheel_centering)

        # Logo Upload e Padding Slider
        control_layout.addWidget(QLabel("LOGOTIPO PARA INVASÃO ORGÂNICA"))
        logo_btns = QHBoxLayout()
        self.btn_upload_logo = QPushButton("Carregar PNG Logo")
        self.btn_upload_logo.clicked.connect(self.upload_logo)
        self.btn_clear_logo = QPushButton("Remover")
        self.btn_clear_logo.setStyleSheet("background-color: #EF4444;")
        self.btn_clear_logo.clicked.connect(self.clear_logo)
        logo_btns.addWidget(self.btn_upload_logo)
        logo_btns.addWidget(self.btn_clear_logo)
        control_layout.addLayout(logo_btns)

        control_layout.addWidget(QLabel("MARGEM DE SEGURANÇA DO LOGO (PADDING)"))
        self.slider_padding = QSlider(Qt.Horizontal)
        self.slider_padding.setRange(10, 25)
        self.slider_padding.setValue(14)
        self.slider_padding.valueChanged.connect(self.update_qr_preview)
        control_layout.addWidget(self.slider_padding)

        workspace_layout.addWidget(control_panel, 1)

        # --- PAINEL DE PREVIEW & METADADOS (Direito) ---
        preview_panel = QFrame()
        preview_panel.setObjectName("CardPanel")
        preview_panel.setStyleSheet("QFrame#CardPanel { background-color: #11111A; border-radius: 12px; }")
        preview_layout = QVBoxLayout(preview_panel)
        preview_layout.setContentsMargins(20, 20, 20, 20)
        preview_layout.setSpacing(15)

        # Título Preview
        preview_title = QLabel("PREVIEW EM TEMPO REAL")
        preview_title.setStyleSheet("font-weight: bold; font-size: 14px; color: #8A2BE2; font-family: 'Space Grotesk'; text-align: center;")
        preview_layout.addWidget(preview_title, alignment=Qt.AlignCenter)

        # Canvas de Exibição da Imagem
        self.preview_canvas = QLabel()
        self.preview_canvas.setFixedSize(380, 380)
        self.preview_canvas.setStyleSheet("border: 2px dashed #2B2D42; border-radius: 10px; background-color: #0B0B0F;")
        self.preview_canvas.setAlignment(Qt.AlignCenter)
        preview_layout.addWidget(self.preview_canvas, alignment=Qt.AlignCenter)

        # --- PAINEL DE CONTRASTE & LEGIBILIDADE (WCAG) ---
        self.contrast_card = QFrame()
        self.contrast_card.setStyleSheet("background-color: #1C1917; border-radius: 8px; border: 1px solid #2E2A24;")
        contrast_layout = QHBoxLayout(self.contrast_card)
        
        self.indicator_color_dot = QFrame()
        self.indicator_color_dot.setFixedSize(14, 14)
        self.indicator_color_dot.setStyleSheet("background-color: #22C55E; border-radius: 7px;")
        
        self.label_contrast_info = QLabel("WCAG Contraste: Excelente (Razão: 14.2) ✔️ Recurso Seguro")
        self.label_contrast_info.setStyleSheet("font-size: 12px; font-weight: 600; color: #E2E8F0;")
        
        contrast_layout.addWidget(self.indicator_color_dot)
        contrast_layout.addWidget(self.label_contrast_info)
        contrast_layout.addStretch()
        
        preview_layout.addWidget(self.contrast_card)

        # Botão para exportar imagem gerada
        self.btn_export = QPushButton("Exportar QR Code de Alta Resolução")
        self.btn_export.setStyleSheet("background-color: #22C55E; font-size: 14px; min-height: 45px;")
        self.btn_export.clicked.connect(self.export_qr_code)
        preview_layout.addWidget(self.btn_export)

        workspace_layout.addWidget(preview_panel, 1)
        main_layout.addLayout(workspace_layout)

    # Slots de Eventos
    def select_fg_color(self):
        color = QColorDialog.getColor(QColor(*self.fg_color_rgb), self, "Cor do QR Code")
        if color.isValid():
            self.fg_color_rgb = (color.red(), color.green(), color.blue())
            self.btn_fg_color.setStyleSheet(f"background-color: {color.name()}; color: #FFFFFF;")
            self.update_qr_preview()

    def select_bg_color(self):
        color = QColorDialog.getColor(QColor(*self.bg_color_rgb), self, "Cor de Fundo")
        if color.isValid():
            self.bg_color_rgb = (color.red(), color.green(), color.blue())
            self.btn_bg_color.setStyleSheet(f"background-color: {color.name()}; color: #FFFFFF;")
            self.update_qr_preview()

    def color_wheel_changed(self, qcolor):
        self.fg_color_rgb = (qcolor.red(), qcolor.green(), qcolor.blue())
        self.btn_fg_color.setStyleSheet(f"background-color: {qcolor.name()}; color: #FFFFFF;")
        self.update_qr_preview()

    def upload_logo(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Selecionar Logotipo", "", "Imagens PNG com canal Alfa (*.png)"
        )
        if file_path:
            self.selected_logo_path = file_path
            self.btn_upload_logo.setText(os.path.basename(file_path))
            self.update_qr_preview()

    def clear_logo(self):
        self.selected_logo_path = None
        self.btn_upload_logo.setText("Carregar PNG Logo")
        self.update_qr_preview()

    def update_qr_preview(self):
        text = self.input_text.text()
        if not text:
            return

        # Mapeia estilo visual da combo para string do generator
        combo_map = {
            "Círculos": "circle",
            "Quadrados": "square",
            "Corações": "heart",
            "Estrelas": "star",
            "Linhas Conectadas": "connected"
        }
        shape = combo_map.get(self.combo_style.currentText(), "circle")
        padding_val = self.slider_padding.value() / 10.0

        try:
            # Invoca o gerador do core
            gen = ArtisticQRGenerator(text)
            
            # Calcula contraste WCAG antes de desenhar
            contrast = gen.calculate_contrast_ratio(self.fg_color_rgb, self.bg_color_rgb)
            self.update_wcag_display(contrast)

            # Gera a imagem estilizada
            pil_img = gen.generate_styled_image(
                shape_style=shape,
                fg_color=self.fg_color_rgb,
                bg_color=self.bg_color_rgb,
                logo_path=self.selected_logo_path,
                padding_ratio=padding_val
            )
            
            # Salva temporário para exibição no PySide6 QLabel
            pil_img.save(self.current_qr_path)
            
            pixmap = QPixmap(self.current_qr_path)
            scaled_pixmap = pixmap.scaled(QSize(360, 360), Qt.KeepAspectRatio, Qt.SmoothTransformation)
            self.preview_canvas.setPixmap(scaled_pixmap)
            
        except Exception as e:
            print(f"Erro ao gerar preview de QR Code: {e}")

    def update_wcag_display(self, contrast_ratio):
        """Atualiza dinamicamente o badge de segurança do contraste WCAG."""
        if contrast_ratio >= 4.5:
            # Excelente - Verde
            self.contrast_card.setStyleSheet("background-color: #022C22; border-radius: 8px; border: 1px solid #064E3B;")
            self.indicator_color_dot.setStyleSheet("background-color: #22C55E; border-radius: 7px;")
            self.label_contrast_info.setText(f"Contraste WCAG: Excelente ({contrast_ratio:.2f}:1) ✔️ Escaneamento Seguro")
            self.label_contrast_info.setStyleSheet("font-size: 12px; font-weight: 600; color: #A7F3D0;")
        elif contrast_ratio >= 3.0:
            # Alerta - Amarelo
            self.contrast_card.setStyleSheet("background-color: #451A03; border-radius: 8px; border: 1px solid #78350F;")
            self.indicator_color_dot.setStyleSheet("background-color: #EAB308; border-radius: 7px;")
            self.label_contrast_info.setText(f"Contraste WCAG: Regular ({contrast_ratio:.2f}:1) ⚠️ Pode falhar no escuro")
            self.label_contrast_info.setStyleSheet("font-size: 12px; font-weight: 600; color: #FEF08A;")
        else:
            # Crítico - Vermelho
            self.contrast_card.setStyleSheet("background-color: #450A0A; border-radius: 8px; border: 1px solid #7F1D1D;")
            self.indicator_color_dot.setStyleSheet("background-color: #EF4444; border-radius: 7px;")
            self.label_contrast_info.setText(f"Contraste WCAG: Insuficiente ({contrast_ratio:.2f}:1) ❌ Baixa legibilidade")
            self.label_contrast_info.setStyleSheet("font-size: 12px; font-weight: 600; color: #FCA5A5;")

    def export_qr_code(self):
        file_path, _ = QFileDialog.getSaveFileName(
            self, "Exportar QR Code", "qrcodando_artistico.png", "Imagens PNG (*.png)"
        )
        if file_path:
            # Copia a imagem temporária do preview para o destino com resolução limpa
            try:
                import shutil
                shutil.copy(self.current_qr_path, file_path)
                QMessageBox.information(
                    self, "Exportação Concluída", f"QR Code exportado com sucesso para:\\n{file_path}"
                )
            except Exception as e:
                QMessageBox.critical(self, "Erro de Exportação", f"Erro ao exportar arquivo: {e}")

def main():
    app = QApplication(sys.argv)
    window = QrcodandoApp()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
`
  },
  {
    name: "utils/helpers.py",
    path: "utils/helpers.py",
    language: "python",
    description: "Métodos utilitários de validação de dados e conversão de paletas Hex para RGB.",
    content: `"""
Qrcodando - Módulos Auxiliares e Validadores
Desenvolvido sob Licença Apache 2.0 por Tiago Rabelo
"""
import re

def is_valid_url(url: str) -> bool:
    """Valida se uma string possui formato válido de link para o QR Code."""
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// ou https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|' # domínios
        r'localhost|' # localhost
        r'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})' # IP
        r'(?::\\d+)?' # portas opcionais
        r'(?:/?|[/?]\\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def hex_to_rgb(hex_str: str) -> tuple:
    """Converte String Hexadecimal (#8A2BE2 ou 8A2BE2) para tupla RGB (138, 43, 226)."""
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 3:
        hex_str = ''.join([c*2 for c in hex_str])
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb: tuple) -> str:
    """Converte tupla RGB para String Hexadecimal."""
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
`
  },
  {
    name: ".github/workflows/release.yml",
    path: ".github/workflows/release.yml",
    language: "yaml",
    description: "Pipeline CI/CD completo do GitHub Actions para criar e distribuir os binários compilados por pyapp e empacotados pelo NFPM (.deb, .rpm, tar.gz).",
    content: `name: Qrcodando CI/CD Release Builder

on:
  push:
    tags:
      - 'v*' # Dispara automaticamente em novas tags de versão, ex: v1.0.0

permissions:
  contents: write

jobs:
  build-and-pack:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Código Fonte
        uses: actions/checkout@v4

      - name: Configurar Ambiente Python
        uses: actions/setup-python@v5
        with:
          python-level: '3.11'
          cache: 'pip'

      - name: Instalar Dependências de Compilação
        run: |
          python -m pip install --upgrade pip
          pip install pyinstaller pyapp build

      - name: Compilar Binário Isolado (pyinstaller)
        run: |
          # Congela a execução do script PySide6 em um binário nativo
          pyinstaller --noconfirm --onedir --windowed --add-data "core:core" --add-data "utils:utils" gui/app.py --name qrcodando

      - name: Instalar NFPM para Empacotamento Nativo Linux
        run: |
          # Instala o utilitário leve NFPM
          echo 'deb [trusted=yes] https://repo.goreleaser.com/apt/ /' | sudo tee /etc/apt/sources.list.d/goreleaser.list
          sudo apt-get update
          sudo apt-get install nfpm -y

      - name: Criar Configuração NFPM (nfpm.yaml)
        run: |
          cat <<EOF > nfpm.yaml
          name: "qrcodando"
          arch: "amd64"
          platform: "linux"
          version: "\${{ github.ref_name }}"
          section: "utils"
          priority: "extra"
          maintainer: "Tiago Rabelo <tiagorabelosels@gmail.com>"
          description: "Gerador de QR Codes artísticos e altamente customizáveis com PySide6"
          homepage: "https://github.com/HonoravelMacho/qrcodando"
          license: "Apache-2.0"
          contents:
            - src: "dist/qrcodando/qrcodando"
              dst: "/usr/bin/qrcodando"
          EOF

      - name: Gerar Pacotes Nativos (.deb e .rpm)
        run: |
          # Gera os arquivos de instalação oficiais
          nfpm package --config nfpm.yaml --target . --packager deb
          nfpm package --config nfpm.yaml --target . --packager rpm
          tar -czvf qrcodando-linux-x64.tar.gz -C dist/qrcodando .

      - name: Publicar Releases de Produção no GitHub
        uses: softprops/action-gh-release@v2
        with:
          files: |
            *.deb
            *.rpm
            *.tar.gz
          body_path: LICENSE
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
  },
  {
    name: "README.md",
    path: "README.md",
    language: "markdown",
    description: "Documentação completa do projeto com guias de terminal Zsh, atalhos de teclado do Micro e guias de publicação no GitHub.",
    content: `# 🚀 Qrcodando - Gerador de QR Codes Artísticos

O **Qrcodando** é uma aplicação open-source revolucionária projetada para criar QR Codes altamente customizáveis, com estilos de módulos inovadores (círculos, estrelas, corações) e suporte à **Invasão Orgânica de Logos com Canal Alpha (Collision Dodge)**. Todo o sistema é construído de forma modular com Python 3 e PySide6, licenciado sob os termos da **Apache License 2.0**.

---

## 👨‍💻 Créditos
Idealizado e desenvolvido com muito orgulho por **Tiago Rabelo**.
- **GitHub:** [HonoravelMacho](https://github.com/HonoravelMacho)
- **Email:** tiagorabelosels@gmail.com

---

## 🛠️ Requisitos e Setup Local (Linux Pop!_OS / Zsh)

Se você utiliza o **Pop!_OS** com terminal **Zsh** e o editor de terminal **Micro**, siga os comandos diretos abaixo para criar seu ambiente virtual isolado, instalar dependências e inicializar a interface gráfica do software:

### 1. Clonar o Repositório e Sincronizar com GitHub
Se você ainda não criou o repositório, faça o bootstrap inicial e sincronize-o rodando estes comandos em seu terminal:

\`\`\`zsh
# Cria o diretório de trabalho local
mkdir -p ~/Projetos/qrcodando
cd ~/Projetos/qrcodando

# Inicializa o Git e cria a branch principal
git init -b main

# Cria a estrutura de pastas do padrão MVC exigido
mkdir -p core gui utils .github/workflows

# Sincroniza com seu novo repositório remoto no GitHub
git remote add origin https://github.com/HonoravelMacho/qrcodando.git
\`\`\`

### 2. Criar e Configurar o Ambiente Virtual (Venv)
Use o python3-venv nativo para manter as dependências limpas e livres de colisões com o sistema operacional:

\`\`\`zsh
# Cria o ambiente virtual chamado '.venv'
python3 -m venv .venv

# Ativa o venv no Zsh
source .venv/bin/activate

# Atualiza os gerenciadores essenciais do Python
pip install --upgrade pip setuptools wheel
\`\`\`

### 3. Instalar Dependências e Escrever os Arquivos com o Editor Micro
Instale as dependências requisitadas para o motor de contraste, imagens e PySide6:

\`\`\`zsh
# Instala pacotes do requirements.txt
pip install -r requirements.txt
\`\`\`

Para criar e preencher os arquivos, use o editor de terminal **Micro** (super fácil e suporta atalhos do teclado modernos como \`Ctrl+S\` para Salvar, \`Ctrl+Q\` para Sair e \`Ctrl+C\` / \`Ctrl+V\` para Copiar/Colar):

\`\`\`zsh
# Criar e editar os módulos da arquitetura
micro core/generator.py  # Cole o código do motor de colisão
micro gui/app.py         # Cole o código da interface PySide6
micro utils/helpers.py   # Cole os ajudantes utilitários
micro pyproject.toml     # Cole a receita de empacotamento pyapp
micro LICENSE            # Cole os termos da Apache 2.0
\`\`\`

### 4. Executar o Qrcodando
Abra o programa diretamente com o runtime do ambiente virtual ativado:

\`\`\`zsh
python gui/app.py
\`\`\`

---

## 🌌 Lógica do Motor de Design Artístico

### 💥 Invasão Orgânica de Logos (Collision Dodge)
Em vez de estampar um quadrado branco seco por cima do QR Code, o algoritmo analisa o pixel local do logotipo carregado. Ele examina os canais de cor RGB e, mais importante, o **canal Alpha** (Canal de Transparência).
Se a opacidade do pixel local (e de sua vizinhança imediata definida pelo slider de Padding) ultrapassar o limite seguro, a célula correspondente do QR Code é **omitida de forma orgânica**, contornando precisamente a silhueta da logo!

### 📊 Redundância Reed-Solomon no Nível H
Para evitar que a exclusão de blocos ou estilos circulares corrompa a leitura do QR Code, o gerador do Qrcodando força nativamente o **Nível H de correção de erro (High - 30%)**. Isso garante que até 30% da superfície do código possa ser perdida ou decorada sem prejudicar de forma alguma a legibilidade por dispositivos móveis comuns.

### ⚖️ Cálculo WCAG de Razão de Contraste
O painel de feedback de escaneabilidade analisa a cor dos pontos (Foreground) e do plano de fundo (Background) em tempo real, calculando a luminância relativa. Razões de contraste inferiores a **3.0:1** emitem alertas vermelhos urgentes para que você mude as cores, impedindo impressões sem leitura.
`
  }
];
