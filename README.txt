Paquete: JhonMontoya_PruebasAutomatizadas.zip

Contenido:
- selenium_ide_project.side  -> Selenium IDE project with modules A and B
- playwright_tests/ -> Playwright project with tests/compra.spec.js and tests/perfil.spec.js
- jmeter_plan.jmx -> JMeter plan configured for 50 users
- aggregate_report_simulated.png -> Simulated Aggregate Report for analysis
- analysis.md -> Analysis document (Markdown)
- analysis.pdf -> Analysis document (PDF)
- README.txt -> Quick run instructions

Run Playwright:
1) cd playwright_tests
2) npm install
3) npx playwright install
4) npx playwright test --headed

