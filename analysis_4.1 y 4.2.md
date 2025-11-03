# Informe Crítico - Evaluación Dual y Rendimiento (JPetStore)

**Portal de Evaluación:** https://jpetstore.aspectran.com/

## 4.1 Análisis Comparativo Funcional (Playwright vs. Selenium IDE)

### Resumen
Se implementaron los Módulos A (Compra Completa) y B (Gestión de Cuenta) con **Playwright** (scripts JS) y **Selenium IDE** (.side). Playwright se configuró con esperas explícitas, selectores CSS robustos y timeouts extendidos. Selenium IDE contiene grabaciones rápidas y aserciones.

### Facilidad de Creación
Criterio	Playwright	Selenium IDE
Configuración Inicial	Requiere instalación de dependencias mediante npm install y configuración del entorno de ejecución (Node.js, navegador, etc.).	No requiere instalación compleja. Funciona como extensión en el navegador y permite grabar interacciones.
Creación de Pruebas	Se escribe código en JavaScript/TypeScript. La curva de aprendizaje es moderada, pero ofrece control total sobre la lógica.	Se basa en grabación automática, muy fácil de usar para pruebas rápidas o usuarios sin experiencia técnica.
Velocidad de Implementación	Más lenta inicialmente por la configuración y codificación.	Muy rápida: grabar y ejecutar en minutos.

Conclusión Parcial: Selenium IDE es ideal para pruebas rápidas o prototipos. Playwright, aunque más complejo, ofrece mayor escalabilidad y control para pruebas profesionales.

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
- Un promedio > 3 s ; la línea del 90% en 4.8s indica que el 10% de peticiones es mucho más lenta.
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

5. Conclusión Personal

Selenium IDE es excelente para validaciones rápidas o demostraciones iniciales sin conocimientos de programación. Su mayor ventaja es la rapidez de creación de pruebas y la simplicidad de uso.

Playwright, en cambio, es más adecuado para proyectos de alto mantenimiento, pruebas de regresión o pipelines CI/CD, donde la estabilidad, la trazabilidad y la integración son claves.

En resumen:

Selenium IDE es ideal para entornos de aprendizaje y prototipado.
Playwright es la elección profesional para pruebas escalables, integradas y confiables.

Autor: Jhon Alexander Montoya
Proyecto: Pruebas Automatizadas N2
Fecha: Noviembre de 2025
