# Smart Agri Four Legged Bot (S.A.F.L)

S.A.F.L (Smart Agri Four Legged Bot) is a semi-autonomous agricultural robot designed for precision farming. The system integrates advanced mechanical structure design validated through Finite Element Analysis (FEA), local real-time convolutional neural network (CNN) inference for weed classification, and automated chemical soil parameter telemetry.

This repository hosts the official documentation, research papers, and technical validation reports built using **Astro Starlight** with a premium dark system-themed interface.

---

## 🚀 Key Engineering Pillars

*   **Structural Integrity (FEA)**: Validated base plate and leg linkages using SolidWorks FEA static, lateral bump, and probe resistance load cases with a minimum Safety Factor (FOS) of **2.04**.
*   **Edge Machine Learning**: Real-time broad-leaf weed detection utilizing a lightweight CNN model deployed locally on an **NVIDIA Jetson Nano** processing input streams at up to **9.2 FPS**.
*   **Soil Telemetry Pipeline**: Modular environmental sensing system using the **Amici Sense** multi-parameter soil probe (measuring moisture, pH, EC, temperature, light, and humidity) over UART interface.
*   **Institutional Framework**: Developed at the Department of Mechanical Engineering, **Muffakham Jah College of Engineering and Technology (MJCET)**, Hyderabad, India (Affiliated to Osmania University). Winner of **1st Place** at the MAKEFORHYDERABAD Make-a-thon.

---

## 📁 Project Structure

The documentation codebase is structured as follows:

```
.
├── public/                     # Static resources, icons, and site assets
├── src/
│   ├── assets/                 # CAD renders, FEA plot diagrams, and photos
│   ├── components/             # Custom Astro component overrides (Hero, MarkdownContent)
│   ├── content/
│   │   ├── docs/               # Markdown/MDX technical reports
│   │   │   ├── credentials.mdx  # Academic oversight, guides, and hackathon awards
│   │   │   ├── index.mdx        # Project landing/splash page
│   │   │   ├── intro.mdx        # Bot architecture and coordinate systems
│   │   │   ├── mechanical-assembly.mdx  # Fabrication setups andElegoo Neptune printing specs
│   │   │   ├── ml-vision.mdx    # Jetson Nano setup, CNN latency, and confidence filters
│   │   │   ├── project-report.mdx # R&D Cell completion report summary
│   │   │   ├── soil-telemetry.mdx # Level-shifted serial telemetry log datasets
│   │   │   └── structural-simulation.mdx # Mesh metrics and Von Mises load case analysis
│   │   └── config.ts           # Starlight content collections schema
│   └── styles/
│       └── custom.css          # Custom styling and typography overrides
├── astro.config.mjs            # Astro, Starlight, and plugin integrations config
├── package.json                # Project dependencies
└── pnpm-lock.yaml              # Lockfile
```

---

## 🛠️ Commands

Execute all terminal commands from the project root directory:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs project dependencies |
| `pnpm dev` | Starts the local hot-reloading development server |
| `pnpm build` | Compiles the production site output to `./dist/` |
| `pnpm preview` | Serves the built production bundle locally |

---

## 💻 Tech Stack & Starlight Plugins

*   **Astro Starlight**: Documentation framework.
*   **starlight-theme-black**: Minimalist dark design system with custom page transitions.
*   **starlight-image-zoom**: Rehype-based medium-zoom image overlay component.
*   **KaTeX & Remark Math**: Native LaTeX syntax support for mathematical formulations and stress tensor equations.
*   **Mermaid.js**: Render structural flowcharts, control hierarchies, and coordinate systems in markdown.
*   **Native System Font Stack**: Leverages zero-latency local system font rendering (San Francisco, Segoe UI, Roboto) for a fast, native desktop app feel.
