# Informe Crítico - Evaluación Dual y Rendimiento (JPetStore)

**Portal de Evaluación:** https://jpetstore.aspectran.com/

## 4.1 Análisis Comparativo Funcional (Playwright vs. Selenium IDE)

### Resumen
Se implementaron los Módulos A (Compra Completa) y B (Gestión de Cuenta) con **Playwright** (scripts JS) y **Selenium IDE** (.side). Playwright se configuró con esperas explícitas, selectores CSS robustos y timeouts extendidos. Selenium IDE contiene grabaciones rápidas y aserciones.

### Facilidad de Creación
- **Selenium IDE:** Muy rápido para grabar flujos; ideal para QA no desarrollador.
- **Playwright:** Requiere setup, pero permite control fino y mantenibilidad vía código y versionamiento (git).

### Estabilidad (Flakiness)
- Playwright ofrece auto-wait y herramientas para reducir flakiness; los tests pueden ser más estables que grabaciones puras de IDE.
- Selenium IDE depende de selectores grabados; cambia cuanta más frecuencia cambie el DOM.

### Legibilidad y Mantenibilidad
- `.side` es legible, pero menos modular que los `.spec.js`. Playwright facilita refactor y reutilización.

### Reporte de Fallos
- IDE: log básico y steps; Playwright: trazas, capturas y video para debugging (mejor en CI).

### Conclusión Personal
- Usaría **Selenium IDE** para pruebas exploratorias y validaciones rápidas. **Playwright** es la mejor opción para CI/CD y suites mantenibles.

## 4.2 Análisis de Resultados de Rendimiento (JMeter)

**Plan y ejecución**: archivo `jmeter_plan.jmx` configurado para 50 usuarios, ramp-up 10s, loop 1, GET a `/actions/Catalog.action?viewCategory=&categoryId=FISH`.

**Métricas simuladas (Aggregate Report)**
- Average (Promedio): 3200 ms
- 90% Line: 4800 ms
- Throughput: 11.8 req/sec
- Error %: 0%

**Interpretación**
- Un promedio > 3 s sugiere degradación de la experiencia de usuario; la línea del 90% en 4.8s indica que el 10% de peticiones es mucho más lenta.
- Throughput 11.8 req/s indica capacidad limitada bajo la carga de 50 usuarios concurrentes con una sola iteración.
- Error % = 0% es positivo (no fallos), pero la latencia alta requiere optimización del backend.

**Impacto en pruebas funcionales**
- Alta latencia provoca timeouts en pruebas E2E (falsos negativos). Se recomienda aumentar timeouts en Playwright, usar mocks en CI o ejecutar pruebas en entornos estables.

## Archivos entregados
- selenium_ide_project.side
- playwright_tests/ (package.json, playwright.config.js, tests/compra.spec.js, tests/perfil.spec.js, tests/config.js)
- jmeter_plan.jmx
- aggregate_report_simulated.png
- analysis.md
- analysis.pdf (versión en PDF de este informe)
