window.AURA_ROADMAPS = window.AURA_ROADMAPS || {};

window.AURA_ROADMAPS['fullstack'] = {
    trackTitle: 'Full Stack Web Engineering',
    sections: [
        {
            id: 'sec-web-fundamentals',
            title: '1. Web Fundamentals',
            topics: [
                {
                    name: 'Internet Basics',
                    definition: 'The Internet is a globally decentralized network of computers communicating via standardized protocols (TCP/IP suite) to route raw data packets worldwide.',
                    concept: '<p>Internet communication relies on packet-switched routing. Payload data is split into IP packets containing payloads, source IPs, and target destination IPs.</p><div class="p-2 border border-secondary rounded bg-dark mb-2"><b>Layer Hierarchy:</b> Physical Layer &rarr; Link Layer &rarr; Internet Layer (IP) &rarr; Transport Layer (TCP/UDP) &rarr; Application Layer (HTTP/DNS).</div>',
                    syntax: 'Client (Browser) ---> [DNS / TCP 3-Way Handshake] ---> Web Server',
                    example: '// Node.js Ping Utility\nconst dns = require("dns");\ndns.lookup("google.com", (err, address, family) => {\n    if (err) throw err;\n    console.log("Address: %s | IPv%s", address, family);\n});',
                    output: 'Address: 142.250.190.46 | IPv4',
                    keyPoints: [
                        'Packet Switching eliminates single points of global communication failure.',
                        'Routers use BGP to navigate the shortest Autonomous System path.',
                        'Bandwidth determines capacity volume; Latency defines packet delivery delay.'
                    ],
                    mistakes: [
                        'Confusing the World Wide Web with the physical Internet infrastructure itself.',
                        'Assuming IP routing guarantees that packets arrive in sequential order without TCP sequence numbers.'
                    ],
                    practiceQuestions: [
                        { title: 'Packet Trace Analysis', desc: 'Execute traceroute in your terminal against an international server and map intermediate router hops.' }
                    ]
                },
                {
                    name: 'How Websites Work',
                    definition: 'The operational mechanism by which browsers transform user input URLs into rendered, interactive web layouts using the Critical Rendering Path (CRP).',
                    concept: '<p>The browser requests an address, resolves DNS, establishes TCP, receives HTML, parses the DOM & CSSOM, builds the Render Tree, computes Layout (Reflow), and paints pixels to the screen framebuffer.</p>',
                    syntax: '<!DOCTYPE html>\n<html>\n  <head><title>App</title></head>\n  <body><main><h1>Loaded</h1></main></body>\n</html>',
                    example: 'document.addEventListener("DOMContentLoaded", () => {\n    console.log("DOM Tree completely parsed!");\n});',
                    output: 'DOM Tree completely parsed!',
                    keyPoints: [
                        'HTML parsing streams iteratively; CSS parsing blocks screen rendering (render-blocking).',
                        'Reflow recalculates physical geometry; Repaint fills visual colors.'
                    ],
                    mistakes: [
                        'Placing synchronous script tags in the head without defer or async.',
                        'Triggering layout thrashing by reading and writing geometry inside loops.'
                    ],
                    practiceQuestions: [
                        { title: 'Performance Audit', desc: 'Use DevTools Performance tab to record FCP and LCP metrics.' }
                    ]
                },
                {
                    name: 'HTTP / HTTPS',
                    definition: 'HyperText Transfer Protocol (Secure) is an asymmetric, stateless application-layer communication protocol running over TLS/TCP.',
                    concept: '<p>HTTPS secures clear-text HTTP by inserting an encrypted TLS layer between TCP and HTTP. Clients verify server certificates via PKI Certificate Authorities.</p>',
                    syntax: 'GET /api/v1/students HTTP/1.1\nHost: api.auragrowth.com\nAuthorization: Bearer <JWT_TOKEN>',
                    example: 'const https = require("https");\nhttps.get("https://jsonplaceholder.typicode.com/todos/1", (res) => {\n    console.log("Status:", res.statusCode);\n});',
                    output: 'Status: 200',
                    keyPoints: [
                        'HTTP/1.1 uses keep-alive; HTTP/2 supports multiplexed streams; HTTP/3 uses UDP/QUIC.',
                        'Idempotent Methods: GET, PUT, DELETE, HEAD. Non-Idempotent: POST.'
                    ],
                    mistakes: [
                        'Assuming HTTPS encrypts URL hostnames; the target IP is visible to intermediate routers.',
                        'Writing code that mutates database records inside GET endpoints.'
                    ],
                    practiceQuestions: [
                        { title: 'TLS Inspection', desc: 'Inspect an HTTPS endpoint certificate expiration date using OpenSSL or browser DevTools.' }
                    ]
                },
                {
                    name: 'DNS',
                    definition: 'The Domain Name System translates human-readable hostnames into computer-routable IP addresses.',
                    concept: '<p>Resolution Path: Browser Cache &rarr; OS Hosts &rarr; Resolving Name Server &rarr; Root Server &rarr; TLD Server &rarr; Authoritative Name Server.</p>',
                    syntax: 'example.com.   300   IN   A      93.184.216.34',
                    example: 'const dns = require("dns").promises;\ndns.resolve4("github.com").then(console.log);',
                    output: '[ "140.82.112.3" ]',
                    keyPoints: [
                        'A Record maps domain to IPv4; AAAA maps to IPv6; CNAME aliases domains.',
                        'TTL governs how long resolvers cache query records.'
                    ],
                    mistakes: [
                        'Setting an apex domain as a CNAME record instead of an ALIAS or A record.',
                        'Setting long TTL values right before a planned server IP migration.'
                    ],
                    practiceQuestions: [
                        { title: 'DNS Lookup', desc: 'Use nslookup or dig to inspect the A and MX records of your domain.' }
                    ]
                },
                {
                    name: 'Client-Server Architecture',
                    definition: 'A distributed model partitioning workloads between UI service requesters (clients) and backend providers (servers).',
                    concept: '<p>Clients manage presentation and input; stateless servers handle business rules, databases, and authentication.</p>',
                    syntax: '[Client Application] <--- HTTP / JSON ---> [Server API] <--- SQL ---> [Database]',
                    example: '// Express Ping\nconst express = require("express");\nconst app = express();\napp.get("/ping", (req, res) => res.json({ status: "healthy" }));',
                    output: '{ status: "healthy" }',
                    keyPoints: [
                        'Horizontal Scaling adds more server instances behind reverse-proxy load balancers.',
                        'Stateless servers store session state externally in Redis or databases.'
                    ],
                    mistakes: [
                        'Trusting frontend validation without re-validating inputs on the server.',
                        'Storing local application state in server memory in multi-server environments.'
                    ],
                    practiceQuestions: [
                        { title: 'Stateless Design', desc: 'Design a session mechanism that functions across three load-balanced servers.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 1 Comprehensive Assessment: Web Fundamentals',
                questions: [
                    { question: 'What is the primary operational distinction between TCP and UDP?', options: ['TCP operates locally; UDP operates globally.', 'TCP guarantees in-order packet delivery; UDP is connectionless without delivery guarantees.', 'UDP encrypts payloads; TCP sends plain text.', 'TCP is only for games; UDP is for web pages.'], correct: 1, explanation: 'TCP establishes state through handshakes and guarantees delivery; UDP transmits datagrams without verification.' },
                    { question: 'Which sequence correctly describes the Critical Rendering Path?', options: ['HTML -> Paint -> Layout -> DOM -> CSSOM', 'DOM + CSSOM -> Render Tree -> Layout -> Paint -> Composite', 'CSSOM -> JS -> DOM -> Server Sync', 'Render Tree -> DOM -> TCP -> Paint'], correct: 1, explanation: 'DOM and CSSOM construct the Render Tree, followed by Layout geometry calculations and Paint rasterization.' },
                    { question: 'Why is CSS render-blocking?', options: ['CSS deletes unparsed HTML nodes.', 'The browser halts visible rendering until the CSSOM is ready to avoid unstyled content flashes (FOUC).', 'CSS runs in WebAssembly.', 'CSS locks databases.'], correct: 1, explanation: 'Browsers delay rendering until CSS is parsed so the page does not flash unstyled elements.' },
                    { question: 'Which HTTP method is idempotent?', options: ['POST', 'PATCH', 'DELETE', 'CONNECT'], correct: 2, explanation: 'DELETE produces the same server state side-effect regardless of how many times it is repeated.' },
                    { question: 'What does HTTP 403 Forbidden mean?', options: ['URL not found.', 'Client must log in.', 'The server understands the user identity but denies permission.', 'Server internal error.'], correct: 2, explanation: '401 means unauthenticated; 403 means authenticated but unauthorized.' },
                    { question: 'What is the role of a recursive DNS resolver?', options: ['Hosts root servers.', 'Queries root, TLD, and authoritative servers on behalf of the client.', 'Compiles HTML to machine code.', 'Encrypts local passwords.'], correct: 1, explanation: 'The resolver traverses the DNS hierarchy step-by-step until the record is found.' },
                    { question: 'Which DNS record aliases one domain name to another?', options: ['A Record', 'AAAA Record', 'CNAME Record', 'TXT Record'], correct: 2, explanation: 'CNAME maps an alias hostname to another canonical domain name.' },
                    { question: 'What is the risk of trusting frontend-only validation?', options: ['CSS Grid fails.', 'Attackers can bypass frontend controls using tools like curl or Postman.', 'DNS records expire.', 'Browser RAM overflows.'], correct: 1, explanation: 'Client-side checks can be bypassed directly at the network level; server-side validation is mandatory.' },
                    { question: 'What does a CORS preflight request do?', options: ['Downloads database backups.', 'Dispatches an HTTP OPTIONS request to check if the server permits the cross-origin request.', 'Installs SSL certificates.', 'Reboots the server.'], correct: 1, explanation: 'OPTIONS preflight requests check cross-origin permissions before sending modifying payloads.' },
                    { question: 'What is the primary benefit of HTTP/2 multiplexing?', options: ['Eliminates IP addresses.', 'Enables multiple bidirectional streams over a single TCP connection, preventing Head-of-Line blocking.', 'Replaces JavaScript with C++.', 'Runs queries with zero latency.'], correct: 1, explanation: 'Multiplexing interleaves multiple requests on one TCP connection simultaneously.' },
                    { question: 'What is the difference between Reflow and Repaint?', options: ['Reflow changes colors; Repaint calculates positions.', 'Reflow calculates layout geometry; Repaint fills in pixels without geometric shifts.', 'Reflow only runs on mobile.', 'They are identical.'], correct: 1, explanation: 'Reflow recalculates physical coordinate geometry; Repaint updates visual styling.' },
                    { question: 'What is Time To Live (TTL) in DNS?', options: ['Server lifespan.', 'The duration resolvers cache a DNS query result before requesting a fresh copy.', 'Handshake latency.', 'User login duration.'], correct: 1, explanation: 'TTL specifies the duration in seconds that a DNS record remains valid in cache.' },
                    { question: 'Why is horizontal scaling preferred over vertical scaling?', options: ['Vertical scaling is free.', 'Horizontal scaling adds stateless server instances, avoiding single points of failure.', 'Horizontal scaling skips testing.', 'Vertical scaling is disabled on Linux.'], correct: 1, explanation: 'Horizontal scaling adds commodity servers behind load balancers rather than hitting single-machine hardware limits.' },
                    { question: 'What does Cache-Control: no-cache mean?', options: ['Never save anything to disk.', 'The browser may cache the resource but must revalidate with the server before using it.', 'Disables database cache.', 'Skips DNS resolution.'], correct: 1, explanation: 'no-cache allows caching with required server validation; no-store forbids caching completely.' },
                    { question: 'How does a browser verify an SSL/TLS certificate?', options: ['Checks digital signatures against trusted root Certificate Authorities (CAs).', 'Guesses passwords.', 'DNS root validates it.', 'Client sends private SSH key.'], correct: 0, explanation: 'The browser checks the server certificate chain of trust against pre-installed operating system root CAs.' }
                ]
            }
        },
        {
            id: 'sec-html',
            title: '2. HTML',
            topics: [
                {
                    name: 'HTML Basics',
                    definition: 'HyperText Markup Language (HTML) is the standard declarative markup language defining the semantic skeletal structure of web pages.',
                    concept: '<p>HTML is parsed into the Document Object Model (DOM). &lt;!DOCTYPE html&gt; enforces HTML5 standards mode and prevents Quirks Mode.</p>',
                    syntax: '<!DOCTYPE html>\n<html lang="en">\n  <head><meta charset="UTF-8"><title>Title</title></head>\n  <body><h1>Hello</h1></body>\n</html>',
                    example: '<!DOCTYPE html>\n<html lang="en">\n<head><title>Academy</title></head>\n<body><p>Welcome to Full Stack.</p></body>\n</html>',
                    output: 'Rendered paragraph: "Welcome to Full Stack."',
                    keyPoints: ['HTML is markup, not a programming language.', 'Missing DOCTYPE causes Quirks Mode.', 'Use lang attribute for screen readers.'],
                    mistakes: ['Forgetting to close tags.', 'Using multiple h1 tags on one page.'],
                    practiceQuestions: [{ title: 'Quirks Mode Check', desc: 'Inspect document.compatMode in the developer console.' }]
                },
                {
                    name: 'Elements & Attributes',
                    definition: 'Elements are the functional units of HTML consisting of tags, content, and configurable attributes.',
                    concept: '<p>Attributes supply metadata or styling hooks. Void elements like img, input, and br do not require closing tags.</p>',
                    syntax: '<tag attribute="value">Content</tag>',
                    example: '<a href="https://auragrowth.com" target="_blank" rel="noopener noreferrer">Visit</a>',
                    output: 'Secure external hyperlink.',
                    keyPoints: ['Always use rel="noopener noreferrer" with target="_blank".', 'alt attributes on images are mandatory for accessibility.'],
                    mistakes: ['Omitting alt attributes on images.', 'Using inline onclick handlers.'],
                    practiceQuestions: [{ title: 'Lazy Loading', desc: 'Add loading="lazy" to 5 images and observe network requests.' }]
                },
                {
                    name: 'Forms',
                    definition: 'Interactive components designed to capture, validate, and submit user inputs over HTTP.',
                    concept: '<p>Forms handle input serialization, encoding formats, and validation constraints.</p>',
                    syntax: '<form action="/api/submit" method="POST">\n  <input type="email" required>\n  <button type="submit">Send</button>\n</form>',
                    example: '<form action="/login" method="POST"><input type="text" required><button type="submit">Login</button></form>',
                    output: 'Interactive form with browser validation.',
                    keyPoints: ['Always associate label for with input id.', 'File uploads require enctype="multipart/form-data".'],
                    mistakes: ['Relying solely on frontend validation.', 'Using GET method for forms with passwords.'],
                    practiceQuestions: [{ title: 'Pattern Check', desc: 'Create an input with a regex pattern requiring strong passwords.' }]
                },
                {
                    name: 'Tables',
                    definition: 'Two-dimensional grid structures specifically intended for presenting tabular relational data.',
                    concept: '<p>Tables use semantic tags: thead, tbody, tfoot, and th scope="col".</p>',
                    syntax: '<table>\n  <caption>Data</caption>\n  <tr><th>Col</th></tr>\n</table>',
                    example: '<table border="1"><caption>Roster</caption><tr><th>ID</th><th>Name</th></tr><tr><td>1</td><td>Anjani</td></tr></table>',
                    output: 'A clean relational table.',
                    keyPoints: ['Never use tables for page layouts.', 'scope attributes guide screen readers.'],
                    mistakes: ['Nesting tables for layout.', 'Omitting the caption element.'],
                    practiceQuestions: [{ title: 'Merged Cells', desc: 'Build a table utilizing colspan and rowspan attributes.' }]
                },
                {
                    name: 'Semantic HTML',
                    definition: 'Tags that convey structural meaning to browsers, search engines, and screen readers.',
                    concept: '<p>Replace generic div wrappers with header, nav, main, article, section, and footer.</p>',
                    syntax: '<header></header>\n<main><article></article></main>\n<footer></footer>',
                    example: '<header><h1>Blog</h1></header><main><article><p>Article content.</p></article></main>',
                    output: 'A semantically structured document.',
                    keyPoints: ['article represents self-contained content.', 'section groups thematically related content.'],
                    mistakes: ['Using section as a wrapper purely for styling.', 'Nesting main inside header.'],
                    practiceQuestions: [{ title: 'Semantic Refactor', desc: 'Refactor a div-based card into semantic article elements.' }]
                },
                {
                    name: 'Accessibility',
                    definition: 'The design of applications to be fully usable by people with disabilities (WCAG compliance).',
                    concept: '<p>Requires semantic markup, clear keyboard focus styles, contrast standards, and proper ARIA labels.</p>',
                    syntax: '<button aria-label="Close">X</button>',
                    example: '<button type="button" aria-label="Close dialog">&times;</button>',
                    output: 'Accessible button for assistive tech.',
                    keyPoints: ['Do not use ARIA if native HTML element exists.', 'Interactive elements must be navigable via Tab key.'],
                    mistakes: ['Setting outline: none without alternative focus indicator.', 'Using clickable divs instead of buttons.'],
                    practiceQuestions: [{ title: 'Keyboard Test', desc: 'Navigate your entire website using only the Tab and Enter keys.' }]
                }
            ],
            quiz: {
                title: 'Week 2 Comprehensive Assessment: HTML5',
                questions: [
                    { question: '1. What is DOCTYPE purpose?', options: ['Standards mode', 'Quirks mode', 'Fast mode', 'None'], correct: 0, explanation: 'Enforces standards mode.' },
                    { question: '2. Target _blank security attribute?', options: ['rel=noopener', 'rel=help', 'rel=author', 'None'], correct: 0, explanation: 'Prevents tabnabbing.' },
                    { question: '3. ARIA first rule?', options: ['Use native tags first', 'Use ARIA everywhere', 'Never use HTML', 'None'], correct: 0, explanation: 'Prioritize native elements.' },
                    { question: '4. Binary upload encoding?', options: ['multipart/form-data', 'application/json', 'text/plain', 'None'], correct: 0, explanation: 'Required for files.' },
                    { question: '5. Article vs Section?', options: ['Article is standalone', 'Section is standalone', 'Identical', 'None'], correct: 0, explanation: 'Articles are independent units.' },
                    { question: '6. Empty alt attribute purpose?', options: ['Screen readers skip', 'Throws error', 'Reads URL', 'None'], correct: 0, explanation: 'Marks image as decorative.' },
                    { question: '7. Primary body landmark?', options: ['main', 'header', 'div', 'section'], correct: 0, explanation: 'Represents central content.' },
                    { question: '8. Non-interrupting live region?', options: ['polite', 'assertive', 'off', 'alert'], correct: 0, explanation: 'Waits until user is idle.' },
                    { question: '9. Void element example?', options: ['br', 'p', 'div', 'span'], correct: 0, explanation: 'br cannot have children.' },
                    { question: '10. Removing focus outline consequence?', options: ['Breaks keyboard navigation', 'Crashes engine', 'Stops CSS', 'None'], correct: 0, explanation: 'Disables visual focus indication.' },
                    { question: '11. Table title element?', options: ['caption', 'label', 'title', 'header'], correct: 0, explanation: 'Provides accessible table name.' },
                    { question: '12. Advantage of button tag?', options: ['Built-in keyboard events', 'Faster layout', 'Encrypted', 'None'], correct: 0, explanation: 'Handles Enter and Space automatically.' },
                    { question: '13. Autocomplete attribute purpose?', options: ['Assists browser autofill', 'Validates server', 'Sends emails', 'None'], correct: 0, explanation: 'Helps password managers.' },
                    { question: '14. Minimum WCAG AA text contrast?', options: ['4.5:1', '2:1', '7:1', '1:1'], correct: 0, explanation: 'Mandated standard ratio.' },
                    { question: '15. Noscript tag utility?', options: ['Fallback when JS is off', 'Compiles code', 'Stores cookies', 'None'], correct: 0, explanation: 'Displays alternative markup.' }
                ]
            }
        },
        {
            id: 'sec-css',
            title: '3. CSS',
            topics: [
                {
                    name: 'CSS Basics & Selectors',
                    definition: 'Cascading Style Sheets (CSS) is a declarative style-sheet language used to describe visual presentation of HTML elements.',
                    concept: '<p>The Cascade resolves conflicting declarations using Specificity weight: Inline (1000) > IDs (100) > Classes (10) > Elements (1).</p>',
                    syntax: 'selector {\n  property: value;\n}',
                    example: '*, *::before, *::after {\n  box-sizing: border-box;\n}\n.btn-primary:hover {\n  background-color: #0284c7;\n}',
                    output: 'Applies border-box sizing and hover states.',
                    keyPoints: ['!important breaks normal cascade flow.', 'Inherited properties flow down to child nodes.', ':root is ideal for CSS variables.'],
                    mistakes: ['Overusing ID selectors in CSS.', 'Misunderstanding universal selector performance.'],
                    practiceQuestions: [{ title: 'Specificity Check', desc: 'Calculate the specificity of ul#nav li.active a.' }]
                },
                {
                    name: 'Box Model',
                    definition: 'The fundamental layout model wherein every document element is treated as a rectangular box comprising Content, Padding, Border, and Margin.',
                    concept: '<p>Under content-box, width/height apply only to content. Under border-box, padding and borders are absorbed inside the specified width.</p>',
                    syntax: '.box {\n  width: 300px;\n  padding: 20px;\n  box-sizing: border-box;\n}',
                    example: '.card {\n  box-sizing: border-box;\n  width: 250px;\n  padding: 16px;\n  border: 1px solid #334155;\n}',
                    output: 'A card container strictly occupying 250px total horizontal space.',
                    keyPoints: ['box-sizing: border-box eliminates layout breakage.', 'Vertical margins collapse between adjacent elements.', 'margin: auto centers elements.'],
                    mistakes: ['Assuming horizontal margins collapse.', 'Applying vertical margin to inline spans.'],
                    practiceQuestions: [{ title: 'Margin Collapse Check', desc: 'Test adjacent 20px bottom and 30px top margins.' }]
                },
                {
                    name: 'Flexbox',
                    definition: 'A one-dimensional layout model providing alignment, space distribution, and ordering along a single axis.',
                    concept: '<p>Main Axis is governed by flex-direction; Cross Axis is perpendicular. justify-content controls main axis, align-items controls cross axis.</p>',
                    syntax: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
                    example: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}',
                    output: 'Flexible responsive navbar with auto spacing.',
                    keyPoints: ['Flexbox operates strictly in one dimension.', 'flex: 1 expands an item to fill remaining space.', 'gap replaces margin hacks.'],
                    mistakes: ['Confusing justify-content with align-items when direction is column.', 'Forgetting flex-wrap: wrap on mobile.'],
                    practiceQuestions: [{ title: 'Center Card', desc: 'Center a card vertically and horizontally using 3 Flexbox rules.' }]
                },
                {
                    name: 'CSS Grid',
                    definition: 'A two-dimensional layout system enabling complex layouts by dividing space into rows and columns simultaneously.',
                    concept: '<p>Grid defines parent template tracks (using fr units and repeat) and positions children within columns and rows.</p>',
                    syntax: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}',
                    example: '.layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: 60px 1fr;\n}',
                    output: 'A full application dashboard layout.',
                    keyPoints: ['Grid is two-dimensional; Flexbox is one-dimensional.', '1fr represents one fraction of available space.', 'auto-fit creates responsive layouts without media queries.'],
                    mistakes: ['Using Flexbox for complicated two-dimensional layouts.', 'Hardcoding fixed pixel widths.'],
                    practiceQuestions: [{ title: 'Responsive Catalog', desc: 'Build an auto-fitting product card grid without @media.' }]
                },
                {
                    name: 'Responsive Web Design',
                    definition: 'An approach configuring web interfaces to adapt their layout to fit any screen resolution.',
                    concept: '<p>Relies on fluid units (rem, %, vh/vw), media queries (@media), and mobile-first min-width queries.</p>',
                    syntax: '@media (min-width: 768px) {\n  .sidebar { display: block; }\n}',
                    example: '.main { display: flex; flex-direction: column; }\n@media (min-width: 992px) { .main { flex-direction: row; } }',
                    output: 'Mobile column switches to desktop row.',
                    keyPoints: ['Mobile-first uses min-width queries.', 'rem scales relative to html root font size.', 'viewport meta tag is mandatory.'],
                    mistakes: ['Using fixed px widths causing mobile horizontal scroll.', 'Over-nesting media queries.'],
                    practiceQuestions: [{ title: 'Fluid Font', desc: 'Implement clamp() typography scale.' }]
                },
                {
                    name: 'Transitions & Animations',
                    definition: 'Mechanics enabling smooth parameter interpolation between property states and keyframe animations.',
                    concept: '<p>Performant animations animate transform and opacity properties directly on the GPU without triggering Reflow.</p>',
                    syntax: '.btn {\n  transition: transform 0.2s ease;\n}\n.btn:active {\n  transform: scale(0.96);\n}',
                    example: '.box {\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n}',
                    output: 'Hardware-accelerated scale bounce effect.',
                    keyPoints: ['Always animate transform and opacity for smooth 60fps.', 'Never animate width, height, or top/left.', 'Use prefers-reduced-motion for a11y.'],
                    mistakes: ['Animating heavy layout properties causing stutter.', 'Forgetting reduced motion accessibility.'],
                    practiceQuestions: [{ title: 'Reduced Motion Check', desc: 'Wrap an animation in prefers-reduced-motion query.' }]
                }
            ],
            quiz: {
                title: 'Week 3 Comprehensive Assessment: Modern CSS Architecture',
                questions: [
                    { question: '1. What is the calculated specificity value of: div#main .nav-item a:hover?', options: ['122 (1 ID, 2 Classes, 2 Elements)', '112 (1 ID, 1 Class, 2 Elements)', '211', '102'], correct: 0, explanation: '#main is ID (100). .nav-item and :hover are classes (20). div and a are elements (2). Total = 122.' },
                    { question: '2. Under content-box, what is total width with width: 300px, padding: 20px, border: 5px?', options: ['300px', '325px', '350px', '250px'], correct: 2, explanation: 'Total Width = 300 + 40 (padding) + 10 (border) = 350px.' },
                    { question: '3. What happens when adjacent block elements have vertical margins of 30px bottom and 20px top?', options: ['They add to 50px', 'They collapse into a single 30px gap', 'Error occurs', 'Cancel to 10px'], correct: 1, explanation: 'Vertical margins collapse into the largest value.' },
                    { question: '4. If flex-direction is column, which property controls horizontal alignment?', options: ['justify-content', 'align-items', 'flex-grow', 'order'], correct: 1, explanation: 'Cross axis becomes horizontal, so align-items manages horizontal alignment.' },
                    { question: '5. What does the Flexbox shorthand flex: 1 expand to?', options: ['flex: 1 1 0%', 'flex: 1 0 auto', 'flex: 0 1 auto', 'flex: 1 1 100%'], correct: 0, explanation: 'flex: 1 evaluates to flex-grow: 1, flex-shrink: 1, flex-basis: 0%.' },
                    { question: '6. What does CSS Grid 1fr unit represent?', options: ['1 frame rate', 'One fraction of available free space', '100% viewport', '1rem'], correct: 1, explanation: 'fr represents a proportional fraction of free space.' },
                    { question: '7. Which Grid function creates responsive columns without media queries?', options: ['repeat(auto-fit, minmax(250px, 1fr))', 'grid-template-columns: 100%', 'grid-auto-flow: dense', 'inline-grid'], correct: 0, explanation: 'repeat(auto-fit, minmax(...)) dynamically wraps columns without media queries.' },
                    { question: '8. What is the difference between rem and em?', options: ['rem is relative to root html font; em is relative to parent font', 'rem is for images only', 'em is absolute', 'Identical'], correct: 0, explanation: 'rem scales from root <html>, em compounds from parent.' },
                    { question: '9. Why does mobile-first prioritize min-width media queries?', options: ['Mobile does not know max-width', 'Applies baseline styles first and layers complexity upward', 'min-width loads faster', 'max-width deprecated'], correct: 1, explanation: 'Ensures mobile processes minimal base rules first.' },
                    { question: '10. Which CSS properties animate smoothly on the GPU at 60fps?', options: ['width and height', 'top and left', 'transform and opacity', 'margin and padding'], correct: 2, explanation: 'transform and opacity are handled directly by the GPU compositor.' },
                    { question: '11. What happens if you animate height instead of transform: scale()?', options: ['No impact', 'Triggers Reflow on every frame causing stutter', 'DOM crash', 'Network lag'], correct: 1, explanation: 'Modifying height triggers expensive Layout Reflow.' },
                    { question: '12. Which media query supports motion-sensitive users?', options: ['@media (prefers-reduced-motion: reduce)', '@media (prefers-color-scheme: dark)', '@media (orientation: portrait)', '@media (pointer: coarse)'], correct: 0, explanation: 'Detects OS minimal animation preference.' },
                    { question: '13. What is the function of will-change property?', options: ['Changes CSS values automatically', 'Hints browser engine to allocate GPU compositor layer ahead of time', 'Resets variables', 'Overrides important'], correct: 1, explanation: 'Gives the browser a hint to optimize GPU rendering for that property.' },
                    { question: '14. What happens when using auto-fill instead of auto-fit?', options: ['auto-fill keeps empty ghost tracks; auto-fit collapses them', 'Loop error', 'Deletes items', 'Identical'], correct: 0, explanation: 'auto-fill preserves empty tracks, auto-fit collapses them to expand items.' },
                    { question: '15. What does the :is() selector achieve?', options: ['Takes specificity of most specific argument and simplifies selector lists', 'Creates variable loops', 'Only matches inputs', 'Forces inline styles'], correct: 0, explanation: ':is() reduces duplication and takes the highest specificity argument.' }
                ]
            }
        },
        {
            id: 'sec-javascript',
            title: '4. JavaScript',
            topics: [
                {
                    name: 'JS Engine & Execution Context',
                    definition: 'JavaScript runs within an engine environment (like V8) which manages memory allocation, execution contexts, call stacks, and garbage collection.',
                    concept: '<p>Every execution creates an Execution Context with two phases: Creation Phase (allocates memory for variables and hoists functions) and Execution Phase (evaluates and executes code line by line).</p>',
                    syntax: '// Global Execution Context\nconst app = "Engine";\nfunction run() {\n  console.log(app);\n}\nrun();',
                    example: 'console.log(declaredVar); // undefined due to hoisting\nvar declaredVar = 42;\n\n// console.log(letVar); // ReferenceError: Temporal Dead Zone\nlet letVar = 100;',
                    output: 'undefined',
                    keyPoints: [
                        'Call Stack tracks the execution threads and follows Last-In, First-Out (LIFO).',
                        'Variables declared with let and const exist in a Temporal Dead Zone (TDZ) before declaration.',
                        'Function declarations are hoisted with their definitions; var is hoisted with undefined.'
                    ],
                    mistakes: [
                        'Accessing let or const variables before initialization, causing ReferenceError.',
                        'Writing deep recursive algorithms without base conditions, resulting in Maximum Call Stack Size Exceeded.'
                    ],
                    practiceQuestions: [
                        { title: 'Call Stack Audit', desc: 'Trace the call stack transitions for nested functions using browser debugger breakpoints.' }
                    ]
                },
                {
                    name: 'Data Types & Equality',
                    definition: 'JavaScript has 7 primitive types (number, string, boolean, null, undefined, symbol, bigint) and mutable Object reference types.',
                    concept: '<p>Primitives are stored by value in memory; Objects, Arrays, and Functions are stored by reference. Double equals (==) performs implicit type coercion; triple equals (===) enforces strict value and type checking.</p>',
                    syntax: 'typeof 42; // "number"\n0 == false; // true (coerced)\n0 === false; // false (strict)',
                    example: 'const objA = { id: 1 };\nconst objB = { id: 1 };\nconsole.log(objA === objB); // false (different memory pointers)\n\nconst objC = objA;\nconsole.log(objA === objC); // true (same reference)',
                    output: 'false\ntrue',
                    keyPoints: [
                        'Always use triple equals (===) to prevent subtle type conversion bugs.',
                        'typeof null evaluates to "object" due to a historical engine implementation design.',
                        'Primitives are immutable; mutating object keys affects all reference holders.'
                    ],
                    mistakes: [
                        'Comparing two independent objects using == or === expecting deep value equality.',
                        'Mutating function input objects directly instead of creating shallow or deep clones.'
                    ],
                    practiceQuestions: [
                        { title: 'Deep Equality Check', desc: 'Implement a function to recursively verify value equality between two nested objects.' }
                    ]
                },
                {
                    name: 'Functions & Closures',
                    definition: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment.',
                    concept: '<p>Closures give inner functions access to an outer function scope even after the outer function has executed and returned from the call stack.</p>',
                    syntax: 'function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}',
                    example: 'function createCounter() {\n  let value = 0;\n  return {\n    increment: () => ++value,\n    getValue: () => value\n  };\n}\nconst counter = createCounter();\ncounter.increment();\nconsole.log(counter.getValue());',
                    output: '1',
                    keyPoints: [
                        'Closures enable data privacy and private state encapsulation.',
                        'Arrow functions lack their own this binding; they inherit this from the surrounding lexical scope.',
                        'Higher-Order Functions accept other functions as parameters or return functions.'
                    ],
                    mistakes: [
                        'Retaining unnecessary closure references inside long-running loops, causing memory retention leaks.',
                        'Using arrow functions as object methods when access to the object via this is required.'
                    ],
                    practiceQuestions: [
                        { title: 'Debounce Implementation', desc: 'Write a closure-based debounce function that delays execution until user typing pauses for 300ms.' }
                    ]
                },
                {
                    name: 'Asynchronous JS & Event Loop',
                    definition: 'The concurrency model coordinating non-blocking I/O operations through the Call Stack, Web APIs, Microtask Queue, and Callback Queue.',
                    concept: '<p>Synchronous code runs on the Call Stack. Async events delegate to Web APIs. Resolved Promise callbacks go to the high-priority Microtask Queue; setTimeout/setInterval go to the Macrotask Queue.</p>',
                    syntax: 'async function fetchData() {\n  const res = await fetch(url);\n  return res.json();\n}',
                    example: 'console.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise"));\nconsole.log("End");',
                    output: 'Start\nEnd\nPromise\nTimeout',
                    keyPoints: [
                        'The Event Loop empties the entire Microtask Queue before picking the next task from the Callback Queue.',
                        'async/await is clean syntactic sugar over native Promise chains.',
                        'Unhandled promise rejections should always be wrapped with try/catch blocks.'
                    ],
                    mistakes: [
                        'Awaiting asynchronous calls inside Array.prototype.forEach loops sequentially (use for...of or Promise.all).',
                        'Blocking the single main thread with heavy CPU-bound computations instead of Web Workers.'
                    ],
                    practiceQuestions: [
                        { title: 'Parallel Requests', desc: 'Use Promise.allSettled to request data from 3 endpoints concurrently and log errors safely.' }
                    ]
                },
                {
                    name: 'DOM Manipulation & Events',
                    definition: 'The Document Object Model (DOM) is an object-oriented representation of the web page which scripts can read, modify, and listen to via events.',
                    concept: '<p>Events traverse through three phases: Capture Phase &rarr; Target Phase &rarr; Bubbling Phase. Event delegation attaches a single listener to a parent element to handle events on dynamic children.</p>',
                    syntax: 'parent.addEventListener("click", (e) => {\n  if (e.target.matches(".child-btn")) {\n    // handle click\n  }\n});',
                    example: 'const list = document.createElement("ul");\n[1, 2].forEach(num => {\n  const li = document.createElement("li");\n  li.textContent = "Item " + num;\n  list.appendChild(li);\n});\ndocument.body.appendChild(list);',
                    output: 'Appends a list containing Item 1 and Item 2 to the document.',
                    keyPoints: [
                        'Event Delegation minimizes memory overhead by attaching one listener to a container.',
                        'e.preventDefault() halts default browser behavior; e.stopPropagation() halts tree bubbling.',
                        'Batching DOM insertions using DocumentFragment reduces costly layout reflows.'
                    ],
                    mistakes: [
                        'Attaching individual click listeners to thousands of rows in a table instead of delegating.',
                        'Reading geometry properties like offsetTop immediately after style changes, causing layout thrashing.'
                    ],
                    practiceQuestions: [
                        { title: 'Dynamic Task List', desc: 'Build an interactive list where item deletions are handled by a single delegated event listener on the parent container.' }
                    ]
                },
                {
                    name: 'Modern ES6+ Syntax & Modules',
                    definition: 'Modern standards introducing clean declarative constructs like destructuring, rest/spread operators, optional chaining, and modular code encapsulation.',
                    concept: '<p>ES6 Modules (ESM) utilize static import and export declarations, enabling bundlers and modern browsers to optimize tree-shaking and module isolation.</p>',
                    syntax: 'import { moduleA } from "./module.js";\nexport const moduleB = () => {};\nconst { name, ...rest } = user;',
                    example: 'const settings = { theme: "dark" };\nconst currentMode = settings?.mode ?? "default";\nconst clone = { ...settings, timestamp: Date.now() };\nconsole.log(currentMode, clone.theme);',
                    output: 'default dark',
                    keyPoints: [
                        'Nullish coalescing (??) checks strictly for null or undefined (unlike falsy || checks).',
                        'Spread syntax creates shallow copies of arrays and objects.',
                        'ES Modules execute in strict mode ("use strict") by default.'
                    ],
                    mistakes: [
                        'Assuming object spread operator ({ ...obj }) performs a deep clone of nested properties.',
                        'Using default exports everywhere, which reduces automated refactoring clarity compared to named exports.'
                    ],
                    practiceQuestions: [
                        { title: 'State Immutability', desc: 'Update a deeply nested object property immutably using the spread operator.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 4 Comprehensive Assessment: Core & Modern JavaScript',
                questions: [
                    { question: '1. What error is thrown when accessing a let or const variable in its Temporal Dead Zone (TDZ)?', options: ['TypeError', 'ReferenceError', 'SyntaxError', 'RangeError'], correct: 1, explanation: 'Variables declared with let and const exist uninitialized in the TDZ from entry of scope until declaration, throwing a ReferenceError upon access.' },
                    { question: '2. What is the output order: console.log("A"); setTimeout(() => console.log("B"), 0); Promise.resolve().then(() => console.log("C")); console.log("D");', options: ['A, B, C, D', 'A, D, C, B', 'A, D, B, C', 'D, A, C, B'], correct: 1, explanation: 'Synchronous code runs first (A, D). Microtasks execute before macrotasks (C before B).' },
                    { question: '3. What does typeof null return in standard JavaScript?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, explanation: 'Due to a legacy engine implementation where object type tags were 000, typeof null returns "object".' },
                    { question: '4. What is the primary difference between == and ===?', options: ['== performs implicit type coercion; === requires matching type and value', '=== converts strings to numbers', '== is faster than ===', 'They behave identically'], correct: 0, explanation: 'Double equals coerces types; triple equals enforces strict value and type equality.' },
                    { question: '5. How does the this keyword behave inside an arrow function?', options: ['It points to the function itself', 'It retains lexical this from the surrounding enclosing scope', 'It defaults to window in strict mode', 'It is dynamically bound on each invocation'], correct: 1, explanation: 'Arrow functions do not bind their own this context; they retain the lexical this of the parent scope.' },
                    { question: '6. What mechanism enables an inner function to remember and access variables from its outer scope after completion?', options: ['Prototypal Inheritance', 'Closure', 'Event Bubbling', 'Garbage Collection'], correct: 1, explanation: 'Closures preserve access to parent lexical scopes even after the outer function has returned.' },
                    { question: '7. In the DOM event dispatch lifecycle, in what order do event phases execute?', options: ['Bubbling -> Target -> Capture', 'Capture -> Target -> Bubbling', 'Target -> Capture -> Bubbling', 'Capture -> Bubbling -> Target'], correct: 1, explanation: 'DOM event dispatch goes from Window downward (Capture), reaches the Target element, and bubbles back up.' },
                    { question: '8. What is the primary purpose of event delegation in DOM scripting?', options: ['To stop page rendering', 'To attach a single event listener on a parent container to manage dynamic child events efficiently', 'To clone HTML elements', 'To prevent default form submission'], correct: 1, explanation: 'Event delegation uses bubbling to listen on a shared ancestor, saving memory.' },
                    { question: '9. What is the functional difference between event.preventDefault() and event.stopPropagation()?', options: ['preventDefault cancels default browser actions; stopPropagation prevents the event from bubbling up the DOM tree', 'stopPropagation stops page loading', 'They are synonyms', 'preventDefault disables styling'], correct: 0, explanation: 'preventDefault halts native actions; stopPropagation stops parent bubbling.' },
                    { question: '10. What does the nullish coalescing operator (??) evaluate against?', options: ['Falsy values (0, "", false, null, undefined)', 'Only null and undefined', 'Only empty strings', 'Only NaN'], correct: 1, explanation: '?? checks strictly against null and undefined, keeping values like 0 or "" valid.' },
                    { question: '11. When cloning an object using the spread operator ({ ...original }), what type of clone is produced?', options: ['Deep clone of all levels', 'Shallow clone (nested objects/arrays share memory references)', 'Immutable frozen object', 'Binary serialized buffer'], correct: 1, explanation: 'Spread performs a shallow copy; nested references still point to the original memory.' },
                    { question: '12. Which Promise method waits for all promises to resolve or reject and returns an array of result objects with status keys?', options: ['Promise.all', 'Promise.race', 'Promise.allSettled', 'Promise.any'], correct: 2, explanation: 'Promise.allSettled waits for all inputs to complete without short-circuiting on errors.' },
                    { question: '13. Why does mutating the DOM inside a loop trigger Layout Thrashing?', options: ['Loops lock the browser thread', 'Alternating between DOM writes and geometry reads forces synchronous reflow recalculation', 'V8 engine crashes', 'DOM parser runs out of memory'], correct: 1, explanation: 'Mixing reads and writes prevents batch rendering and forces immediate layout recalculation.' },
                    { question: '14. What does the JS keyword "use strict" enforce?', options: ['Faster compile times', 'Eliminates silent errors by throwing exceptions and prevents accidental global variables', 'Compiles code to WebAssembly', 'Encrypts source code'], correct: 1, explanation: 'Strict mode surfaces silent mistakes and prevents unsafe actions like undeclared globals.' },
                    { question: '15. How do ES6 Modules (ESM) differ fundamentally from CommonJS (require)?', options: ['ESM imports are static and evaluated at parse time enabling tree-shaking; CommonJS loads dynamically at runtime', 'CommonJS runs only in the browser', 'ESM cannot export functions', 'They are completely identical'], correct: 0, explanation: 'ESM allows compile-time analysis and tree-shaking; CommonJS runs synchronously at runtime.' }
                ]
            }
        },
    {

    
            id: 'sec-git',
            title: '5. Git & GitHub',
            topics: [
                {
                    name: 'Version Control & Git Internals',
                    definition: 'Git is a distributed version control system that tracks content changes via snapshots stored in a content-addressable database using cryptographic SHA-1/SHA-256 hashes.',
                    concept: '<p>Git operates across three primary local zones: Working Directory &rarr; Staging Area (Index) &rarr; Repository (.git database). Objects consist of Blobs (file data), Trees (directories), Commits (pointers to trees and parents), and Annotated Tags.</p>',
                    syntax: 'git init\ngit add <file>\ngit commit -m "feat: commit message"',
                    example: '# Initialize repo and inspect commit object\ngit init\necho "Hello Aura" > README.md\ngit add README.md\ngit commit -m "docs: initial commit"\ngit cat-file -p HEAD',
                    output: 'tree a8b2...\nauthor Developer <dev@aura.com>\ncommitter Developer <dev@aura.com>\n\ndocs: initial commit',
                    keyPoints: [
                        'Git stores complete compressed snapshots (blobs), not delta differences.',
                        'HEAD is simply a symbolic reference pointer to the currently checked-out branch tip.',
                        '.gitignore prevents accidental commits of secrets, logs, and node_modules.'
                    ],
                    mistakes: [
                        'Committing sensitive credentials or .env files into version control.',
                        'Assuming git commit automatically stages modified files without git add.'
                    ],
                    practiceQuestions: [
                        { title: 'Git Object Inspection', desc: 'Use git cat-file -t and -p to explore raw commit, tree, and blob hashes.' }
                    ]
                },
                {
                    name: 'Branching & Merging',
                    definition: 'Branching isolates independent development lines. Merging integrates disparate historical commits into a unified branch tip.',
                    concept: '<p>Fast-Forward merges occur when no divergent commits exist on the target branch. Three-Way (Recursive/ORT) merges create a new merge commit combining two distinct divergent histories.</p>',
                    syntax: 'git checkout -b <branch-name>\ngit merge <source-branch>',
                    example: 'git checkout -b feature/auth\n# work done and committed\ngit checkout main\ngit merge --no-ff feature/auth',
                    output: 'Merge made by the \'ort\' strategy.\n auth.js | 24 ++++++++++++++++++++++++\n 1 file changed, 24 insertions(+)',
                    keyPoints: [
                        'Branches in Git are merely lightweight 41-byte movable pointers to specific commits.',
                        'git switch and git restore provide cleaner dedicated alternatives to overloaded git checkout commands.',
                        'Merge conflicts happen when opposing branches modify identical lines within the same file.'
                    ],
                    mistakes: [
                        'Resolving merge conflicts by blind deletion without testing resulting functional state.',
                        'Maintaining long-lived feature branches that diverge too far from main.'
                    ],
                    practiceQuestions: [
                        { title: 'Simulated Conflict', desc: 'Create two branches modifying the same line in index.html and manually resolve the resulting conflict.' }
                    ]
                },
                {
                    name: 'Rebasing & History Management',
                    definition: 'Rebasing reapplies a sequence of commits on top of a new base tip, creating a linear and readable project history.',
                    concept: '<p>Rebasing changes the base of your branch from one commit to another, rewriting commit hashes. Interactive rebase (git rebase -i) allows squashing, rewording, dropping, and editing past commits.</p>',
                    syntax: 'git rebase <base-branch>\ngit rebase -i HEAD~N',
                    example: 'git checkout feature/api\ngit fetch origin\ngit rebase origin/main\n# Resolves linearly without generating redundant merge commits',
                    output: 'Successfully rebased and updated refs/heads/feature/api.',
                    keyPoints: [
                        'Golden Rule: Never rebase commits that have been pushed to a public shared branch.',
                        'Rebasing rewrites commit SHA hashes; merging preserves verbatim historical timestamps.',
                        'git rebase --abort returns the branch to its exact pre-rebase state safely.'
                    ],
                    mistakes: [
                        'Force-pushing (git push -f) rebased shared branches, overwriting teammates\' local work.',
                        'Panicking during conflicts during rebase instead of using git status and git rebase --continue.'
                    ],
                    practiceQuestions: [
                        { title: 'Interactive Squash', desc: 'Use git rebase -i HEAD~3 to squash three WIP commits into a single conventional commit.' }
                    ]
                },
                {
                    name: 'Remotes & GitHub Collaboration',
                    definition: 'GitHub serves as a cloud-hosted remote repository platform facilitating peer code review, continuous integration, and team collaboration.',
                    concept: '<p>git fetch downloads objects and refs from the remote without modifying local working trees; git pull executes git fetch followed immediately by a git merge or rebase.</p>',
                    syntax: 'git remote add origin <url>\ngit push -u origin <branch>',
                    example: 'git remote -v\ngit fetch origin\ngit log HEAD..origin/main --oneline',
                    output: 'origin  https://github.com/org/repo.git (fetch)\norigin  https://github.com/org/repo.git (push)\ne4b21d1 feat: remote updates available',
                    keyPoints: [
                        'Pull Requests (PRs) provide structured workflows for line-by-line peer reviews and automated CI checks.',
                        'git pull --rebase prevents unhelpful merge commits when syncing upstream remote updates.',
                        'Forking copies a remote repository entirely into an independent GitHub user namespace.'
                    ],
                    mistakes: [
                        'Using git pull blindly without understanding what incoming remote commits will merge into working branches.',
                        'Authoring massive 2,000-line Pull Requests instead of small, modular review units.'
                    ],
                    practiceQuestions: [
                        { title: 'Fork & Upstream Sync', desc: 'Configure an upstream remote for a forked repo and sync main with upstream changes.' }
                    ]
                },
                {
                    name: 'Stashing, Cherry-Picking & Reset',
                    definition: 'Advanced recovery and context-switching utilities to stage unfinished work, selectively transplant commits, or undo commits.',
                    concept: '<p>git stash pushes dirty working directory changes onto a stack. git reset alters HEAD and index state (Soft: moves HEAD; Mixed: un-stages; Hard: discards working changes). git revert creates an inverse commit.</p>',
                    syntax: 'git stash push -m "wip"\ngit stash pop\ngit cherry-pick <commit-hash>\ngit revert <commit-hash>',
                    example: 'git stash\ngit checkout hotfix\n# fix applied and pushed\ngit checkout feature\ngit stash pop',
                    output: 'Saved working directory and index state WIP on feature: wip\nOn branch feature\nChanges not staged for commit:\n  modified: app.js',
                    keyPoints: [
                        'git revert is safe for public shared branches; git reset should be restricted to local branches.',
                        'git reset --hard permanently destroys uncommitted working tree changes.',
                        'git cherry-pick enables copying an isolated bug fix commit into production without merging incomplete feature branches.'
                    ],
                    mistakes: [
                        'Running git reset --hard without checking if untracked/unstaged changes contain critical uncommitted work.',
                        'Accumulating dozens of forgotten stashes without applying or dropping them.'
                    ],
                    practiceQuestions: [
                        { title: 'Safe Undo', desc: 'Use git revert on a pushed commit to reverse its changes without rewriting remote Git history.' }
                    ]
                },
                {
                    name: 'Reflog & Disaster Recovery',
                    definition: 'Git Reference Logs (reflog) record every movement of HEAD and branch tips within the local repository, serving as a safety net for lost commits.',
                    concept: '<p>Commits detached via resets or deleted branches remain preserved in Git loose storage until garbage collection (git gc) sweeps unreferenced objects after 30 to 90 days.</p>',
                    syntax: 'git reflog\ngit reset --hard HEAD@{n}',
                    example: 'git reflog\n# 7f3a12b HEAD@{0}: reset: moving to HEAD~2\n# 9c14ef0 HEAD@{1}: commit: critical feature\ngit reset --hard 9c14ef0',
                    output: 'HEAD is now at 9c14ef0 commit: critical feature',
                    keyPoints: [
                        'git reflog tracks local actions only; reflog entries are never transmitted over git push.',
                        'Accidentally deleted branches can be instantly recovered by pointing a new branch to the reflog commit hash.',
                        'Git virtually never loses data once a commit hash has been generated.'
                    ],
                    mistakes: [
                        'Assuming an accidental git reset --hard permanently deleted your committed work before checking reflog.',
                        'Relying on reflog for files that were never staged or committed in the first place.'
                    ],
                    practiceQuestions: [
                        { title: 'Branch Resurrection', desc: 'Delete a local feature branch using git branch -D and resurrect it cleanly using git reflog.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 5 Comprehensive Assessment: Git Architecture & GitHub Operations',
                questions: [
                    { question: '1. What type of core Git object represents file content within the .git directory?', options: ['Commit object', 'Blob object', 'Tree object', 'Tag object'], correct: 1, explanation: 'Blobs store raw compressed file content without filename or permission metadata.' },
                    { question: '2. Which zone holds changes that have been indexed but not yet permanently recorded in a commit?', options: ['Working Directory', 'Staging Area (Index)', 'Remote Repository', 'Reflog'], correct: 1, explanation: 'The Staging Area (Index) caches pre-commit snapshots ready to be packed into the next tree object.' },
                    { question: '3. What occurs during a Git Fast-Forward merge?', options: ['A new merge commit is constructed', 'Git simply moves the target branch pointer forward to the tip of the incoming branch', 'All incoming commits are squashed', 'A rebase conflict is triggered'], correct: 1, explanation: 'When no divergent commits exist on the target branch, Git moves the branch reference pointer forward without creating a merge commit.' },
                    { question: '4. What is the fundamental risk of running git rebase on a public shared branch?', options: ['It crashes the GitHub server', 'It rewrites commit history and hashes, causing divergence for all collaborating team members', 'It deletes the .git directory', 'It locks the repository against future commits'], correct: 1, explanation: 'Rebasing creates new commit hashes; force-pushing these invalidates branches checked out by teammates.' },
                    { question: '5. What is the difference between git fetch and git pull?', options: ['git fetch downloads remote refs without modifying local working trees; git pull fetches and automatically integrates them', 'git fetch deletes remote branches', 'git pull is strictly read-only', 'They are completely identical'], correct: 0, explanation: 'git fetch retrieves remote changes safely into remote-tracking branches; git pull fetches and merges/rebases into the active branch.' },
                    { question: '6. What does git reset --soft HEAD~1 do?', options: ['Deletes all code changes permanently', 'Moves HEAD back by one commit while leaving changes staged in the index', 'Unstages files and clears the working tree', 'Pushes an undo commit to origin'], correct: 1, explanation: 'A soft reset rewinds the commit pointer while preserving modified files in the staging index.' },
                    { question: '7. Why is git revert preferred over git reset on shared branches?', options: ['git revert does not require network access', 'git revert generates a new commit that records the inverse changes without rewriting existing shared history', 'git reset is deprecated', 'git revert runs faster'], correct: 1, explanation: 'git revert preserves chronological history by recording the undo operation as a standard forward commit.' },
                    { question: '8. How does Git detect that a file was renamed between commits?', options: ['It tracks file inodes on the disk', 'It dynamically compares content similarity hashes between removed and added files during diff computation', 'It writes metadata into .gitignore', 'Git cannot detect renames'], correct: 1, explanation: 'Git does not explicitly store rename records; its diff engine infers renames when content similarity exceeds a threshold.' },
                    { question: '9. What command recovers a lost commit after an unintended git reset --hard?', options: ['git reflog', 'git fsck --lost-found', 'git checkout origin/main', 'git status'], correct: 0, explanation: 'git reflog maintains an unpruned history of HEAD transitions, providing the SHA hash needed to reset back.' },
                    { question: '10. What does git cherry-pick <commit-hash> achieve?', options: ['Deletes an arbitrary commit', 'Applies the changes from an existing isolated commit onto the current HEAD branch as a new commit', 'Picks random branches to prune', 'Reverts a PR merge'], correct: 1, explanation: 'Cherry-picking copies an isolated diff from anywhere in the commit graph and applies it directly to the active branch.' },
                    { question: '11. In Git internals, what does a Tree object store?', options: ['Compressed file data only', 'Directories, filenames, permissions, and pointers to child blobs or nested trees', 'Author and committer identity', 'Commit messages'], correct: 1, explanation: 'Tree objects represent directory hierarchies, mapping human filenames and file modes to blob hashes.' },
                    { question: '12. What does git stash pop do?', options: ['Discards the top stashed change permanently', 'Applies the most recently stashed changes back into the working tree and removes it from the stash list', 'Clears all stashes', 'Creates a backup branch'], correct: 1, explanation: 'pop applies stash@{0} to the working tree and immediately removes it from the stash stack.' },
                    { question: '13. What is the effect of the flag --no-ff on git merge?', options: ['Prevents fast-forwarding and forces creation of a distinct merge commit preserving branch topology', 'Skips commit hooks', 'Cancels merge on conflicts', 'Runs merge in background'], correct: 0, explanation: '--no-ff forces Git to construct an explicit merge commit even if a linear fast-forward is possible.' },
                    { question: '14. What does the file .gitignore explicitly prevent?', options: ['Tracking untracked files from being staged via git add commands', 'Viewing git logs', 'Cloning repos with SSH keys', 'Merging upstream PRs'], correct: 0, explanation: '.gitignore instructs Git to ignore specified paths, preventing them from being added to the index.' },
                    { question: '15. Which command permanently removes unreferenced loose Git objects during cleanup operations?', options: ['git prune / git gc', 'git clean -fd', 'git reset --hard', 'git checkout .'], correct: 0, explanation: 'git gc (garbage collection) packs refs and prunes orphaned loose objects from the object database.' }
                ]
            }
        },
   {
            id: 'sec-react',
            title: '6. React',
            topics: [
                {
                    name: 'React Internals & Virtual DOM',
                    definition: 'React is a declarative component-based UI library that models interfaces as pure functions of state using an in-memory Virtual DOM representation.',
                    concept: '<p>React operates across two phases: Render Phase (constructs Virtual DOM tree, performs Reconciliation via the Fiber algorithm) and Commit Phase (applies calculated minimal DOM mutations to real browser nodes).</p>',
                    syntax: 'import React from "react";\nfunction App() {\n  return <h1>Hello React</h1>;\n}',
                    example: 'import { createRoot } from "react-dom/client";\n\nfunction Greeting({ name }) {\n  return <div className="card">Welcome, {name}</div>;\n}\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(<Greeting name="Anjani" />);',
                    output: '<div class="card">Welcome, Anjani</div>',
                    keyPoints: [
                        'React Fiber engine enables incremental rendering and interruptible work scheduling.',
                        'Reconciliation matches elements using stable key identifiers to minimize costly layout DOM mutations.',
                        'JSX compiles directly into React.createElement function calls at build time.'
                    ],
                    mistakes: [
                        'Using array index as element key props during dynamic list reordering or deletions.',
                        'Mutating state objects directly instead of passing new immutable memory references.'
                    ],
                    practiceQuestions: [
                        { title: 'Reconciliation Key Test', desc: 'Render an array of shuffled items with and without stable keys to observe DOM node reuse in DevTools.' }
                    ]
                },
                {
                    name: 'State, Props & Component Lifecycle',
                    definition: 'Props are immutable inputs passed from parent to child; State is local, mutable component-owned data that drives visual re-rendering upon modification.',
                    concept: '<p>Component lifecycles divide into Mount (initial creation), Update (props/state changes triggering re-renders), and Unmount (cleanup and destruction from DOM).</p>',
                    syntax: 'const [state, setState] = useState(initialValue);',
                    example: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(prev => prev + 1)}>\n      Count: {count}\n    </button>\n  );\n}',
                    output: 'Interactive counter button updating displayed numeric count on click.',
                    keyPoints: [
                        'State updates in React 18+ are automatically batched across all event handlers, promises, and timeouts.',
                        'Props flow strictly downwards in one direction (unidirectional data flow).',
                        'State updaters accept callback functions (prev => prev + 1) to avoid race conditions with batched state.'
                    ],
                    mistakes: [
                        'Calling setState synchronously multiple times without functional updater callbacks.',
                        'Attempting to reassign or modify props within child component functions directly.'
                    ],
                    practiceQuestions: [
                        { title: 'Batched State Audit', desc: 'Trigger three consecutive state increments in a single event and verify total computed value.' }
                    ]
                },
                {
                    name: 'Essential Hooks (useState, useEffect, useRef)',
                    definition: 'Hooks are functions allowing functional components to tap into React state, side-effect lifecycles, and persistent references.',
                    concept: '<p>useState handles state retention. useEffect synchronizes external systems (APIs, subscriptions) after render commit. useRef retains mutable values or DOM elements across renders without triggering re-renders.</p>',
                    syntax: 'useEffect(() => {\n  // side effect setup\n  return () => { /* cleanup */ };\n}, [dependencies]);',
                    example: 'import { useEffect, useState, useRef } from "react";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <input ref={inputRef} placeholder={Seconds: ${seconds}} />;\n}',
                    output: 'Input field continuously displaying elapsed seconds with managed interval cleanup.',
                    keyPoints: [
                        'Rules of Hooks: Only call hooks at the top level of React functions; never inside loops or conditions.',
                        'useEffect cleanups prevent serious memory leaks when components unmount.',
                        'useRef changes do not notify React to schedule a re-render.'
                    ],
                    mistakes: [
                        'Omitting variables referenced inside useEffect from its dependency array.',
                        'Causing infinite render loops by setting state inside useEffect without specifying a dependency array.'
                    ],
                    practiceQuestions: [
                        { title: 'Window Resize Listener', desc: 'Build a hook listening to window resize events with safe addEventListener/removeEventListener cleanup.' }
                    ]
                },
                {
                    name: 'Performance Optimization (memo, useMemo, useCallback)',
                    definition: 'Techniques preventing unnecessary component re-evaluations and expensive calculation reruns across render cycles.',
                    concept: '<p>React.memo skips re-rendering when props remain shallowly identical. useMemo caches expensive computation return values. useCallback memoizes function instances between parent renders.</p>',
                    syntax: 'const memoizedVal = useMemo(() => compute(data), [data]);\nconst memoizedCb = useCallback(() => handleClick(id), [id]);',
                    example: 'import { useState, useMemo, useCallback } from "react";\n\nfunction ListFilter({ items }) {\n  const [query, setQuery] = useState("");\n  const filtered = useMemo(() => items.filter(i => i.includes(query)), [items, query]);\n  const logItem = useCallback((item) => console.log(item), []);\n  return <div>{filtered.length} matches</div>;\n}',
                    output: 'Renders match count while memoizing expensive filter operations across unrelated parent state changes.',
                    keyPoints: [
                        'React.memo relies strictly on shallow prop comparison (Object.is).',
                        'useCallback(fn, deps) is syntactic equivalent to useMemo(() => fn, deps).',
                        'Avoid premature memoization; calculate cost-to-benefit ratio before applying memo hooks.'
                    ],
                    mistakes: [
                        'Wrapping lightweight scalar calculations in useMemo where memoization overhead exceeds calculation cost.',
                        'Passing inline object or function props into React.memo components without useMemo or useCallback.'
                    ],
                    practiceQuestions: [
                        { title: 'Expensive Prime Sieve', desc: 'Memoize a prime generation function calculating the first 10,000 primes using useMemo.' }
                    ]
                },
                {
                    name: 'Context API & State Management',
                    definition: 'A mechanism to share global data (themes, auth sessions, locales) across an entire component tree without prop drilling.',
                    concept: '<p>Comprises createContext, Provider (broadcasts state to downstream subtree), and useContext (consumes active context). High-frequency state changes are typically offloaded to Zustand or Redux Toolkit.</p>',
                    syntax: 'const ThemeCtx = createContext(null);\n// Usage: const theme = useContext(ThemeCtx);',
                    example: 'import { createContext, useContext } from "react";\n\nconst AuthContext = createContext({ user: "Anjani" });\n\nfunction UserBadge() {\n  const { user } = useContext(AuthContext);\n  return <span>Logged in as: {user}</span>;\n}\n\nfunction App() {\n  return (\n    <AuthContext.Provider value={{ user: "Anjani" }}>\n      <UserBadge />\n    </AuthContext.Provider>\n  );\n}',
                    output: '<span>Logged in as: Anjani</span>',
                    keyPoints: [
                        'Context re-renders all consuming components whenever the provided context value identity changes.',
                        'Prop Drilling is passing props down through intermediary components that do not need them.',
                        'Split unrelated contexts (e.g., AuthContext vs ThemeContext) to limit re-render scope.'
                    ],
                    mistakes: [
                        'Passing a new object literal directly to Provider value without useMemo, triggering universal re-renders.',
                        'Using Context as a replacement for high-velocity state streams instead of specialized stores like Zustand.'
                    ],
                    practiceQuestions: [
                        { title: 'Dark Mode Context', desc: 'Create a theme toggle Provider storing active theme state in localStorage.' }
                    ]
                },
                {
                    name: 'Custom Hooks & Code Reusability',
                    definition: 'Self-authored JavaScript functions whose names begin with "use" that encapsulate reusable stateful logic composed of native hooks.',
                    concept: '<p>Custom hooks share stateful logic, not state itself. Each component calling a custom hook receives an entirely independent, isolated state instance.</p>',
                    syntax: 'function useFetch(url) {\n  const [data, setData] = useState(null);\n  // logic\n  return { data };\n}',
                    example: 'import { useState, useEffect } from "react";\n\nfunction useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setIsOnline(true);\n    const off = () => setIsOnline(false);\n    window.addEventListener("online", on);\n    window.addEventListener("offline", off);\n    return () => {\n      window.removeEventListener("online", on);\n      window.removeEventListener("offline", off);\n    };\n  }, []);\n  return isOnline;\n}',
                    output: 'Exports reusable reactive hook returning current network connection status.',
                    keyPoints: [
                        'Must follow React hook naming convention: always prefix with "use" to enable linter rules.',
                        'Enables clear separation between UI presentation markup and business domain logic.',
                        'Custom hooks can return primitives, arrays, objects, or callback dispatchers.'
                    ],
                    mistakes: [
                        'Expecting two components calling the same custom hook to share the identical state instance.',
                        'Writing complex logic into monolithic components instead of extracting specialized custom hooks.'
                    ],
                    practiceQuestions: [
                        { title: 'useLocalStorage Hook', desc: 'Build a custom hook synchronizing state seamlessly with browser localStorage.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 6 Comprehensive Assessment: React Architecture & Core Patterns',
                questions: [
                    { question: '1. What algorithm powers the modern React Virtual DOM reconciliation architecture?', options: ['Red-Black Tree', 'Fiber Architecture', 'Depth-First Matrix', 'B-Tree Engine'], correct: 1, explanation: 'The Fiber architecture allows React to break rendering work into units and pause/resume execution across frames.' },
                    { question: '2. Why is using an array index as a key prop considered an anti-pattern for dynamic lists?', options: ['React throws a compiler error', 'It leads to component state corruption and incorrect DOM updates during item reordering, insertions, or deletions', 'It disables CSS styles', 'It leaks memory to the browser'], correct: 1, explanation: 'When items are reordered or deleted, index keys do not match element identities, causing React to reuse wrong internal component state.' },
                    { question: '3. How does React 18 manage multiple state updates triggered within promises, timeouts, or native events?', options: ['Executes them synchronously', 'Automatically batches them into a single re-render pass', 'Throws concurrent render exceptions', 'Ignores all updates after the first'], correct: 1, explanation: 'React 18 introduces automatic batching across all asynchronous boundaries, minimizing unnecessary intermediate re-renders.' },
                    { question: '4. What is the fundamental difference between useRef and useState?', options: ['useRef values trigger component re-render on mutation; useState does not', 'useState updates trigger re-render; modifying a ref does not trigger a re-render', 'useRef is only for class components', 'useState is stored on the server'], correct: 1, explanation: 'Mutating ref.current does not notify React to schedule a re-render, whereas setting state queues a render.' },
                    { question: '5. When does the cleanup function returned inside a useEffect hook execute?', options: ['Before the component re-runs the effect on dependency change and when unmounting', 'Only when the app is closed', 'Before the initial render', 'Synchronously before HTML parsing'], correct: 0, explanation: 'React runs effect cleanup prior to reapplying effects on changed dependencies and when unmounting the component.' },
                    { question: '6. What does React.memo do when wrapping a functional component?', options: ['Deeply clones the component', 'Skips re-rendering the component if its props have not shallowly changed', 'Forces re-render on every frame', 'Encrypts the component bundle'], correct: 1, explanation: 'React.memo memoizes the rendered output, preventing re-renders if incoming props pass shallow reference equality checks.' },
                    { question: '7. What problem does the React Context API primarily solve?', options: ['Replaces relational databases', 'Eliminates prop drilling by passing data directly down the component tree', 'Speeds up image loading', 'Compiles JSX to native C++ code'], correct: 1, explanation: 'Context provides a clean way to share state down the tree without manually wiring props through intermediate children.' },
                    { question: '8. What is the key characteristic of custom React hooks?', options: ['They allow components to share the same physical state variable', 'They encapsulate reusable stateful logic while providing isolated state instances to each caller', 'They can bypass the Rules of Hooks', 'They execute on the server only'], correct: 1, explanation: 'Custom hooks isolate and reuse stateful logic patterns; each calling component receives its own independent state.' },
                    { question: '9. What does the useCallback hook return?', options: ['A memoized callback function instance that only changes when specified dependencies mutate', 'The calculated value of an expensive loop', 'A DOM reference node', 'A state setter tuple'], correct: 0, explanation: 'useCallback caches a function definition between renders, keeping its memory pointer stable across parent renders.' },
                    { question: '10. What occurs if you call a state updater without functional syntax: setCount(count + 1) three times in a row within an event?', options: ['Count increases by 3', 'Count increases by only 1 due to stale closure over the render count value', 'React crashes with infinite loop', 'Count resets to 0'], correct: 1, explanation: 'Each call references the identical count value captured during that render pass; using prev => prev + 1 resolves this.' },
                    { question: '11. Which hook should be used to read DOM measurements like element height synchronously before screen paint?', options: ['useEffect', 'useLayoutEffect', 'useTransition', 'useId'], correct: 1, explanation: 'useLayoutEffect fires synchronously after all DOM mutations but before the browser paints screen pixels, preventing visual layout jumps.' },
                    { question: '12. What does JSX ultimately transpile into before browser execution?', options: ['Machine assembly', 'Nested React.createElement function calls', 'Raw string templates', 'WebAssembly binary'], correct: 1, explanation: 'Build tools transpile declarative JSX syntax directly into React.createElement (or _jsx runtime) invocations.' },
                    { question: '13. What is the purpose of the React 18 useTransition hook?', options: ['Adds CSS transitions', 'Marks state updates as non-urgent transitions, keeping the UI responsive during heavy renders', 'Replaces fetch API', 'Handles page routing transitions'], correct: 1, explanation: 'useTransition lets you prioritize urgent interactions (like typing in an input) over non-urgent background render updates.' },
                    { question: '14. Why should you avoid passing a new object literal directly into a Context Provider value without useMemo?', options: ['Throws invalid prop types error', 'Creates a new reference on every parent render, forcing all consumer components to re-render unnecessarily', 'Breaks React Fiber', 'Disables React DevTools'], correct: 1, explanation: 'An unmemoized object literal produces a fresh memory reference each render, defeating downstream memoization.' },
                    { question: '15. What rule must be strictly followed when writing React Hooks?', options: ['Only call hooks at the top level of function components and never inside loops, conditions, or nested functions', 'Call hooks inside class components', 'Always wrap hooks in try/catch blocks', 'Declare hooks at the bottom of the file'], correct: 0, explanation: 'React relies on the call order of hooks remaining identical on every render cycle to correctly track state indices.' }
                ]
            }
        },
        {
            id: 'sec-typescript',
            title: '7. TypeScript',
            topics: [
                {
                    name: 'TypeScript Basics & Type System',
                    definition: 'TypeScript is a strongly typed superset of JavaScript that transpiles down to plain JavaScript, introducing static compile-time type validation.',
                    concept: '<p>The TypeScript compiler (tsc) performs static analysis to catch syntax, semantic, and type-mismatch errors during compilation. Types are completely erased at build time, resulting in zero runtime performance overhead.</p>',
                    syntax: 'let age: number = 24;\nlet username: string = "Anjani";\nlet isEnrolled: boolean = true;',
                    example: 'function calculateTax(amount: number, taxRate: number = 0.18): number {\n  return amount * (1 + taxRate);\n}\nconst finalPrice = calculateTax(100);\nconsole.log(finalPrice);',
                    output: '118',
                    keyPoints: [
                        'TypeScript enforces static typing at compile time; runtime execution remains standard JavaScript.',
                        'Type Erasure strips all interfaces, types, and annotations out of the compiled JS bundle.',
                        'Type Inference allows TypeScript to deduce types automatically without explicit annotations.'
                    ],
                    mistakes: [
                        'Assuming TypeScript validates inputs or prevents runtime errors without runtime schema libraries like Zod.',
                        'Relying on implicit any across function signatures instead of enabling strict mode.'
                    ],
                    practiceQuestions: [
                        { title: 'tsconfig Audit', desc: 'Initialize a project with tsc --init and enable noImplicitAny and strictNullChecks.' }
                    ]
                },
                {
                    name: 'Interfaces vs Type Aliases',
                    definition: 'Interfaces and Type Aliases define the shape of objects, functions, and composite data structures in TypeScript.',
                    concept: '<p>Interfaces are extendable, open-ended, and support Declaration Merging. Type Aliases are versatile, supporting primitive unions, intersections, tuples, and mapped types.</p>',
                    syntax: 'interface User {\n  id: string;\n  name: string;\n}\n\ntype Status = "pending" | "approved" | "rejected";',
                    example: 'interface BaseItem {\n  id: number;\n}\ninterface Product extends BaseItem {\n  title: string;\n  price: number;\n}\ntype ProductCardProps = Product & { inStock: boolean };',
                    output: 'Defines composable shapes using interface extension and type intersection.',
                    keyPoints: [
                        'Prefer interfaces for public API object definitions and object shape inheritance.',
                        'Use Type Aliases when composing union types, tuple structures, or complex primitive mappings.',
                        'Declaration merging allows re-opening an interface to add extra properties across module boundaries.'
                    ],
                    mistakes: [
                        'Attempting declaration merging with type aliases (which triggers duplicate identifier errors).',
                        'Creating deep intersection types that resolve to "never" due to conflicting property types.'
                    ],
                    practiceQuestions: [
                        { title: 'Interface Extension', desc: 'Define an AdminUser interface that extends a base User interface with role permissions.' }
                    ]
                },
                {
                    name: 'Generics & Reusable Abstractions',
                    definition: 'Generics allow writing flexible, reusable functions, interfaces, and classes that work across diverse data types while retaining strong type safety.',
                    concept: '<p>Type variables (e.g., &lt;T&gt;) act as placeholders for incoming types, capturing the caller\'s supplied type and guaranteeing return contract consistency without resorting to any.</p>',
                    syntax: 'function identity<T>(arg: T): T {\n  return arg;\n}',
                    example: 'interface ApiResponse<TData> {\n  status: number;\n  payload: TData;\n}\n\ninterface UserProfile {\n  id: string;\n  username: string;\n}\n\nconst userResponse: ApiResponse<UserProfile> = {\n  status: 200,\n  payload: { id: "u_101", username: "Anjani" }\n};',
                    output: 'ApiResponse wrapper strongly typed to UserProfile data.',
                    keyPoints: [
                        'Generics eliminate unsafe type assertions and duplicate logic across distinct data types.',
                        'Generic constraints (T extends { id: string }) enforce minimum structural shape requirements.',
                        'Default generic parameters (<T = string>) simplify consumer instantiation.'
                    ],
                    mistakes: [
                        'Using any instead of generics, which loses all compile-time autocomplete and safety guarantees.',
                        'Over-engineering simple single-type functions with unnecessary generic parameters.'
                    ],
                    practiceQuestions: [
                        { title: 'Generic API Client', desc: 'Build a generic fetchJson<T>(url: string): Promise<T> helper function.' }
                    ]
                },
                {
                    name: 'Unions, Intersections & Type Narrowing',
                    definition: 'Unions model values that can be one of several types; Type Narrowing refines broad union types into specific concrete types at runtime.',
                    concept: '<p>Discriminated Unions use a shared literal discriminator property (e.g., kind or type) to allow the compiler to exhaustively inspect and narrow branches safely within switch statements.</p>',
                    syntax: 'type Shape = \n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number };',
                    example: 'type NetworkState =\n  | { status: "loading" }\n  | { status: "success"; data: string[] }\n  | { status: "error"; error: string };\n\nfunction render(state: NetworkState) {\n  switch (state.status) {\n    case "loading": return "Loading...";\n    case "success": return state.data.join(", ");\n    case "error": return Error: ${state.error};\n  }\n}',
                    output: 'Exhaustive pattern matching across all network state union branches.',
                    keyPoints: [
                        'Type narrowing guards: typeof, instanceof, in operator, and custom user-defined type predicates (is).',
                        'Discriminated unions enable bulletproof finite-state-machine architectures.',
                        'The never type verifies compile-time exhaustiveness checks in default switch blocks.'
                    ],
                    mistakes: [
                        'Accessing union-specific properties without first narrowing the active type via guards.',
                        'Omitting a switch branch in a discriminated union when exhaustive checking is expected.'
                    ],
                    practiceQuestions: [
                        { title: 'Type Predicate Guard', desc: 'Write an isAxiosError(err: unknown): err is AxiosError custom type guard function.' }
                    ]
                },
                {
                    name: 'Utility Types & Advanced Typing',
                    definition: 'Built-in type transformers that derive new types from existing shapes (Partial, Pick, Omit, Record, Readonly, ReturnType).',
                    concept: '<p>Utility types leverage mapped types and conditional types (T extends U ? X : Y) to transform, filter, or immutably lock object signatures dynamically.</p>',
                    syntax: 'type DraftUser = Partial<User>;\ntype UserPreview = Pick<User, "id" | "name">;\ntype PublicUser = Omit<User, "passwordHash">;',
                    example: 'interface Session {\n  token: string;\n  userId: string;\n  role: string;\n}\n\ntype ReadonlySession = Readonly<Session>;\ntype UserCache = Record<string, Session>;\n\nconst cache: UserCache = {\n  "usr_01": { token: "abc", userId: "usr_01", role: "admin" }\n};',
                    output: 'Enforces type-safe string-keyed cache dictionary of immutable Session entities.',
                    keyPoints: [
                        'Partial<T> makes all keys optional; Required<T> makes all keys mandatory.',
                        'Pick<T, K> extracts selected properties; Omit<T, K> strips specified properties.',
                        'ReturnType<typeof fn> extracts the inferred return type of a function.'
                    ],
                    mistakes: [
                        'Manually duplicating modified interfaces instead of composing built-in utility types.',
                        'Confusing Pick (keeps specific keys) with Omit (removes specific keys).'
                    ],
                    practiceQuestions: [
                        { title: 'Immutable State Type', desc: 'Combine Readonly and DeepReadonly concepts to protect nested state trees from accidental mutations.' }
                    ]
                },
                {
                    name: 'any vs unknown vs never',
                    definition: 'The three extreme top and bottom types governing safety, unpredictability, and impossibility within the TypeScript type lattice.',
                    concept: '<p>any turns off all type checking entirely (unsafe). unknown represents any value but forbids operations until narrowed (type-safe top type). never represents values that can never occur (bottom type).</p>',
                    syntax: 'let valA: any;\nlet valB: unknown;\nfunction fail(): never { throw new Error(); }',
                    example: 'function parseInput(raw: unknown) {\n  // raw.toUpperCase(); // Error: Object is of type "unknown"\n  if (typeof raw === "string") {\n    return raw.toUpperCase(); // Allowed after narrowing\n  }\n  return "";\n}',
                    output: 'Safely validates unknown external inputs before performing string operations.',
                    keyPoints: [
                        'Prefer unknown over any when handling untyped external inputs (e.g., API payloads, JSON.parse).',
                        'never is returned by functions that throw unhandled exceptions or run infinite loops.',
                        'Using any completely compromises TypeScript autocomplete, safety, and refactoring stability.'
                    ],
                    mistakes: [
                        'Using any as a quick escape hatch instead of writing proper type guards or using unknown.',
                        'Believing type assertions (as unknown as TargetType) perform runtime data validations.'
                    ],
                    practiceQuestions: [
                        { title: 'Safe JSON Parser', desc: 'Create a safe parseJson(raw: string): unknown utility requiring caller validation.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 7 Comprehensive Assessment: TypeScript Architecture & Static Typing',
                questions: [
                    { question: '1. What happens to TypeScript types and interfaces when compiled by tsc into JavaScript?', options: ['They are converted into JSON schemas', 'They are completely erased from the output files (Type Erasure)', 'They run inside a WebAssembly sandbox', 'They become runtime prototype checks'], correct: 1, explanation: 'TypeScript compiles away types completely; the final runtime output contains zero TypeScript type syntax overhead.' },
                    { question: '2. What is the fundamental difference between any and unknown?', options: ['unknown allows calling methods directly without checks; any forbids it', 'any bypasses all compile-time checks; unknown requires explicit type narrowing before any operation', 'unknown is deprecated in modern TypeScript', 'They are completely identical keywords'], correct: 1, explanation: 'unknown is the type-safe counterpart of any. It accepts any value but disallows property access without prior type narrowing.' },
                    { question: '3. What unique architectural capability do Interfaces have that Type Aliases do not?', options: ['Union declarations', 'Declaration Merging (re-opening interfaces across files)', 'Tuple definitions', 'Primitive aliasing'], correct: 1, explanation: 'Multiple interface declarations with identical names automatically merge their property members; type aliases throw duplicate identifier errors.' },
                    { question: '4. What does the never type represent in the TypeScript type system?', options: ['A variable initialized to null', 'A type representing values that never occur, such as a function that always throws or unreachable branches', 'An optional parameter', 'An empty object literal'], correct: 1, explanation: 'never is the bottom type representing impossible states, infinite loops, or exhaustive switch default cases.' },
                    { question: '5. Which utility type creates a new type by making all properties of an existing type optional?', options: ['Pick<T, K>', 'Partial<T>', 'Omit<T, K>', 'Record<K, T>'], correct: 1, explanation: 'Partial<T> iterates through all keys in T and applies the optional modifier (?) to each.' },
                    { question: '6. In a Discriminated Union pattern, what is the role of the discriminator property?', options: ['It stores the database primary key', 'It is a common literal property present on all union variants allowing TypeScript to narrow branches deterministically', 'It serializes payloads to binary', 'It speeds up garbage collection'], correct: 1, explanation: 'A literal tag property (such as kind: "success" | "error") allows the type checker to eliminate impossible union branches.' },
                    { question: '7. What does the type helper ReturnType<T> accomplish?', options: ['Extracts the return type of a given function type', 'Converts a promise to its resolved type', 'Forces a function to return void', 'Returns the parameter count'], correct: 0, explanation: 'ReturnType uses conditional infer typing to inspect a function signature and extract its returned type.' },
                    { question: '8. How does TypeScript verify that an exhaustive switch check across a union is complete?', options: ['By assigning the remaining unhandled variable to type never in the default case', 'By throwing an unhandled runtime error', 'By counting array keys', 'By reading .tsconfig options only'], correct: 0, explanation: 'Assigning the switch default argument to a variable typed as never triggers a compile error if any union member was forgotten.' },
                    { question: '9. What does the TypeScript keyword keyof produce when applied to an object type?', options: ['An array of values', 'A union type of all property key names of that type', 'A JavaScript Map object', 'A boolean check'], correct: 1, explanation: 'keyof T produces a union of string, number, or symbol literal types representing all valid keys of T.' },
                    { question: '10. What does the type assertion "val as TargetType" actually do at runtime?', options: ['Converts the variable using type casting algorithms', 'Nothing; it informs the compiler to treat the value as that type without changing runtime data', 'Validates the memory heap', 'Throws an invalid cast exception'], correct: 1, explanation: 'Type assertions are purely compile-time hints; they perform zero runtime validation or value conversions.' },
                    { question: '11. What is the signature requirement for a custom Type Predicate function?', options: ['Must return a boolean and have a return type annotation of the form "arg is Type"', 'Must return void', 'Must return a Promise<boolean>', 'Must be an arrow function'], correct: 0, explanation: 'A type predicate returns a boolean and annotates the return type with "paramName is SpecificType" to narrow caller scopes.' },
                    { question: '12. What does the utility type Record<K, T> construct?', options: ['A SQL database row', 'An object type whose property keys are K and property values are T', 'A readonly tuple array', 'A class constructor'], correct: 1, explanation: 'Record<Keys, Values> creates a clean dictionary object shape mapping specified keys to designated value types.' },
                    { question: '13. What is the function of the generic constraint syntax <T extends ValidShape>?', options: ['It extends the class prototype at runtime', 'It restricts allowable generic type arguments to those satisfying ValidShape', 'It disables TypeScript strict mode for that function', 'It converts T into an interface'], correct: 1, explanation: 'extends inside generic angle brackets sets an upper bound on allowable types that can be supplied.' },
                    { question: '14. Under strictNullChecks: true, what is the default type compatibility of null and undefined?', options: ['They are valid values for number and string', 'They are only assignable to any, unknown, and their own respective types', 'They crash the compiler immediately', 'They are coerced to 0 and empty string'], correct: 1, explanation: 'With strictNullChecks enabled, null and undefined are distinct types and cannot be assigned to concrete types like number or string without explicit union.' },
                    { question: '15. What does the satisfies operator (introduced in TypeScript 4.9) enable?', options: ['Validates that an expression matches a type without widening or losing the specific inferred literal type', 'Replaces runtime Zod schema parsing', 'Enforces async execution on promises', 'Compiles TypeScript to C++'], correct: 0, explanation: 'satisfies ensures a value conforms to a contract shape while preserving its exact literal types and property completions.' }
                ]
            }
        },
        {
            id: 'sec-backend-nodejs',
            title: '8. Backend Development',
            topics: [
                {
                    name: 'Node.js Architecture & Libuv',
                    definition: 'Node.js is an open-source, cross-platform JavaScript runtime environment executing code outside the browser using Google V8 and Libuv.',
                    concept: '<p>Node.js runs single-threaded JavaScript execution on the main Event Loop, while offloading expensive asynchronous I/O operations (file system, DNS, crypto, network) to the Libuv C++ thread pool (default 4 worker threads).</p>',
                    syntax: 'import http from "http";\nconst server = http.createServer((req, res) => {\n  res.end("OK");\n});',
                    example: 'import os from "os";\nimport fs from "fs/promises";\n\nasync function inspectEnvironment() {\n  const cores = os.cpus().length;\n  await fs.writeFile("system.log", Platform: ${os.platform()} | Cores: ${cores}\\n);\n  console.log("System info recorded asynchronously.");\n}\ninspectEnvironment();',
                    output: 'System info recorded asynchronously.',
                    keyPoints: [
                        'The main thread is single-threaded; asynchronous operations leverage Libuv threads.',
                        'Never run CPU-heavy operations (e.g., massive loops, sync crypto) on the main event loop.',
                        'process.nextTick() fires immediately after the current operation finishes, before other microtasks.'
                    ],
                    mistakes: [
                        'Using synchronous methods like fs.readFileSync in production servers, freezing the entire application for all active users.',
                        'Confusing Libuv thread pool tasks with Worker Threads (which run custom parallel JS computation).'
                    ],
                    practiceQuestions: [
                        { title: 'Event Loop Phasing', desc: 'Write a script mixing process.nextTick, Promise.then, setTimeout, and setImmediate to trace execution sequence.' }
                    ]
                },
                {
                    name: 'Express.js Fundamentals & Routing',
                    definition: 'Express.js is a minimalist, flexible web application framework for Node.js providing robust routing and HTTP server utilities.',
                    concept: '<p>Express processes incoming HTTP requests through an application router stack. Route handlers match URL paths and HTTP verbs (GET, POST, PUT, DELETE, PATCH), receiving req (request), res (response), and next function pointers.</p>',
                    syntax: 'import express from "express";\nconst app = express();\napp.get("/api/v1/health", (req, res) => res.json({ status: "up" }));',
                    example: 'import express from "express";\nconst app = express();\n\napp.use(express.json());\n\napp.get("/api/users/:userId", (req, res) => {\n  const { userId } = req.params;\n  res.status(200).json({ id: userId, username: "anjani_dev" });\n});',
                    output: 'JSON response: { "id": "101", "username": "anjani_dev" } on GET /api/users/101',
                    keyPoints: [
                        'express.json() middleware parses incoming application/json payloads into req.body.',
                        'req.params captures dynamic URL route parameters; req.query parses URL query strings.',
                        'Express routes evaluate in the exact physical order they are defined.'
                    ],
                    mistakes: [
                        'Forgetting to call res.send(), res.json(), or next(), leaving client requests hanging until timeout.',
                        'Defining wildcard route patterns (/*) before specific static routes, intercepting incoming traffic accidentally.'
                    ],
                    practiceQuestions: [
                        { title: 'Modular Sub-Routers', desc: 'Split application user and product endpoints into distinct express.Router() modules.' }
                    ]
                },
                {
                    name: 'Middleware Architecture',
                    definition: 'Functions that have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle.',
                    concept: '<p>Middleware executes sequentially as a pipeline (Onion model). Common duties include parsing bodies, handling authentication tokens, logging request times, validating schemas, and handling centralized errors.</p>',
                    syntax: 'const myMiddleware = (req, res, next) => {\n  // perform operation\n  next();\n};',
                    example: 'const requestLogger = (req, res, next) => {\n  const start = Date.now();\n  res.on("finish", () => {\n    console.log(${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms));\n  });\n  next();\n};\n\napp.use(requestLogger);',
                    output: 'Console output: GET /api/v1/courses - 200 (14ms)',
                    keyPoints: [
                        'Every middleware must either terminate the cycle with res.send/json or pass control with next().',
                        'Error-handling middleware is uniquely identified by four parameters: (err, req, res, next).',
                        'Middleware order is critical: place global loggers first and error catchers last.'
                    ],
                    mistakes: [
                        'Calling next() multiple times within a single middleware path, causing "Cannot set headers after they are sent to the client" errors.',
                        'Defining custom error middleware with only 3 arguments, causing Express to treat it as standard route middleware.'
                    ],
                    practiceQuestions: [
                        { title: 'Authentication Guard', desc: 'Construct an authMiddleware checking authorization headers and verifying bearer tokens.' }
                    ]
                },
                {
                    name: 'RESTful API Architecture & Status Codes',
                    definition: 'A stateless architectural style using standard HTTP protocols and hypermedia constraints to build decoupled, predictable web interfaces.',
                    concept: '<p>REST APIs treat entities as addressable resources accessed via uniform resource identifiers (URIs) and mapped to HTTP verbs: POST (Create), GET (Read), PUT (Replace), PATCH (Partial Update), DELETE (Remove).</p>',
                    syntax: 'POST   /api/v1/orders\nGET    /api/v1/orders/:id\nPATCH  /api/v1/orders/:id\nDELETE /api/v1/orders/:id',
                    example: 'app.post("/api/v1/orders", (req, res) => {\n  const newOrder = { id: "ord_99", ...req.body };\n  res.status(201)\n     .location(/api/v1/orders/${newOrder.id})\n     .json(newOrder);\n});',
                    output: 'HTTP 201 Created with JSON payload and Location header pointer.',
                    keyPoints: [
                        '2xx = Success (200 OK, 201 Created, 204 No Content).',
                        '4xx = Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict).',
                        '5xx = Server Errors (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable).'
                    ],
                    mistakes: [
                        'Returning status 200 OK with payload { error: "Something broke" } instead of proper 4xx/5xx codes.',
                        'Using action verbs in URLs (e.g., /api/v1/createUser instead of POST /api/v1/users).'
                    ],
                    practiceQuestions: [
                        { title: 'Idempotency Validation', desc: 'Design an idempotent PUT endpoint and compare its state behavior to a non-idempotent POST.' }
                    ]
                },
                {
                    name: 'Streams & Event-Driven Architecture',
                    definition: 'Node.js Streams are Unix-like pipelines handling streaming collections of data chunk-by-chunk without loading full files into system memory.',
                    concept: '<p>Streams can be Readable, Writable, Duplex, or Transform. Streams utilize Backpressure mechanics to throttle incoming read buffers if downstream write sinks are running slower than source providers.</p>',
                    syntax: 'import fs from "fs";\nimport { pipeline } from "stream/promises";\nawait pipeline(readable, transform, writable);',
                    example: 'import fs from "fs";\nimport http from "http";\n\nconst server = http.createServer((req, res) => {\n  const stream = fs.createReadStream("large_video.mp4");\n  res.writeHead(200, { "Content-Type": "video/mp4" });\n  stream.pipe(res);\n});',
                    output: 'Streams multi-gigabyte video files with minimal, constant RAM consumption.',
                    keyPoints: [
                        'Streams prevent V8 heap out-of-memory crashes when dealing with large payloads or file uploads.',
                        'stream.pipeline handles stream errors, closure cleanup, and backpressure automatically.',
                        'EventEmitter (events module) forms the backbone of all streaming Node.js core modules.'
                    ],
                    mistakes: [
                        'Using raw fs.readFile on gigantic files, exhausting available Node.js memory heaps.',
                        'Using stream.pipe without handling error events on both source and destination streams (use stream/promises pipeline instead).'
                    ],
                    practiceQuestions: [
                        { title: 'Gzip Stream Compressor', desc: 'Build a script transforming and compressing a log file using zlib.createGzip() pipeline.' }
                    ]
                },
                {
                    name: 'Authentication & Security (JWT, bcrypt, CORS, Helmet)',
                    definition: 'Enterprise safeguards securing backend services against unauthorized access, credential theft, and web attack vectors.',
                    concept: '<p>Passwords are salted and hashed using bcrypt. Stateless authentication utilizes signed JSON Web Tokens (JWT) containing Header, Payload, and Signature. HTTP security headers are enforced via helmet and cors middleware.</p>',
                    syntax: 'import bcrypt from "bcrypt";\nimport jwt from "jsonwebtoken";\nconst token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: "1h" });',
                    example: 'import helmet from "helmet";\nimport cors from "cors";\nimport express from "express";\n\nconst app = express();\napp.use(helmet());\napp.use(cors({ origin: "https://auragrowth.com", credentials: true }));',
                    output: 'Applies secure HTTP headers (HSTS, CSP, X-Frame-Options) and restricts origins.',
                    keyPoints: [
                        'Never store plain text passwords; always hash with adaptive algorithms like bcrypt (cost factor >= 10) or Argon2.',
                        'Store sensitive JWT refresh tokens in httpOnly, Secure, SameSite=Strict cookies to defend against XSS.',
                        'Rate limiting (express-rate-limit) protects against brute-force credential stuffing and DoS attacks.'
                    ],
                    mistakes: [
                        'Storing secret keys directly in version-controlled source code instead of .env environment files.',
                        'Storing highly sensitive secrets or passwords directly inside unencrypted JWT payloads.'
                    ],
                    practiceQuestions: [
                        { title: 'Secure Password Auth Flow', desc: 'Implement user registration hashing passwords with bcrypt and issuing signed JWTs on login.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 8 Comprehensive Assessment: Backend Engineering with Node.js & Express',
                questions: [
                    { question: '1. What component handles asynchronous file I/O and DNS operations within the Node.js runtime?', options: ['V8 Engine directly', 'Libuv C++ thread pool', 'Chrome DevTools Protocol', 'Node Package Manager'], correct: 1, explanation: 'Libuv provides an abstraction layer and manages a worker thread pool to handle blocking OS tasks asynchronously.' },
                    { question: '2. What happens if you execute an intensive CPU-bound synchronous calculation on the Node.js main thread?', options: ['It spawns new server instances automatically', 'The event loop freezes, blocking all other client requests and incoming network connections', 'It offloads to the GPU', 'Node.js throws a ThreadBlockedException'], correct: 1, explanation: 'JavaScript on the Node.js main thread is single-threaded; CPU-bound loops block the event loop from servicing other I/O events.' },
                    { question: '3. What distinguishes process.nextTick() from setImmediate() in the Node.js execution cycle?', options: ['process.nextTick fires immediately after the current operation before the event loop continues; setImmediate fires in the Check phase of the next loop tick', 'setImmediate runs faster than nextTick', 'nextTick is only available in browsers', 'They are synonymous'], correct: 0, explanation: 'process.nextTick drains its queue immediately after the current synchronous block, prior to proceeding to subsequent event loop phases.' },
                    { question: '4. In an Express.js middleware function, what occurs if neither res.send/json nor next() is invoked?', options: ['Express returns a 200 OK automatically', 'The incoming HTTP request hangs indefinitely until the client or gateway socket times out', 'The server crashes', 'It routes to the error handler'], correct: 1, explanation: 'Express request pipelines require explicit completion by closing the response or delegating to the next handler via next().' },
                    { question: '5. How does Express distinguish an Error-handling middleware from standard route middleware?', options: ['By its file name', 'By taking exactly four arguments in its function signature: (err, req, res, next)', 'By returning an Error object', 'By running outside the application stack'], correct: 1, explanation: 'Express inspects function.length; an arity of 4 flags the middleware specifically to capture errors forwarded via next(err).' },
                    { question: '6. What HTTP status code should be returned after successfully creating a new resource via a POST request?', options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'], correct: 1, explanation: '201 Created signals that the request succeeded and resulted in the creation of a new identifiable resource.' },
                    { question: '7. What is the fundamental property of an Idempotent HTTP method?', options: ['It executes in zero milliseconds', 'Making multiple identical requests has the same effect on the server state as a single request', 'It requires TLS encryption', 'It only accepts JSON bodies'], correct: 1, explanation: 'Methods like GET, PUT, and DELETE are idempotent because repeating them does not alter resulting server state beyond the initial call.' },
                    { question: '8. Why should streaming pipelines (stream.pipeline) be preferred over raw fs.readFile for file downloads?', options: ['Streams consume constant low memory by buffering chunks rather than loading entire multi-gigabyte files into V8 RAM', 'Streams encrypt data automatically', 'readFile does not work on Linux', 'Streams bypass the TCP stack'], correct: 0, explanation: 'Streams process and transmit data in small chunks, avoiding memory exhaustion and high heap allocation.' },
                    { question: '9. What is Backpressure in the context of Node.js Streams?', options: ['A mechanism signaling the readable source to pause transmission when the writable destination buffer is full', 'A network attack on open ports', 'A database connection limit', 'An error thrown by corrupted file headers'], correct: 0, explanation: 'Backpressure prevents memory buffer overflows by throttling the stream producer when the consumer buffer reaches highWaterMark.' },
                    { question: '10. What is the main vulnerability of storing JWT tokens in browser localStorage?', options: ['It expires after 5 minutes', 'It is accessible to any malicious JavaScript running on the page via Cross-Site Scripting (XSS)', 'It cannot be sent over HTTPS', 'It corrupts browser cookies'], correct: 1, explanation: 'Any script injected via an XSS vulnerability can read localStorage; httpOnly cookies prevent script access to tokens.' },
                    { question: '11. What is the role of a Salt when hashing passwords with bcrypt?', options: ['Encrypts the database connection', 'A unique random value added to passwords before hashing to defeat rainbow table lookups and identical hashes for identical passwords', 'Speeds up hashing computations', 'Acts as a secret JWT signing key'], correct: 1, explanation: 'Salts introduce unique entropy, ensuring that even identical user passwords produce entirely distinct cryptographic hashes.' },
                    { question: '12. What does the npm package Helmet achieve in an Express application?', options: ['Encrypts incoming POST bodies', 'Sets critical HTTP response security headers (HSTS, CSP, X-Frame-Options) to harden against common web vulnerabilities', 'Compresses images', 'Provides automatic database caching'], correct: 1, explanation: 'Helmet secures Express applications by configuring well-known HTTP headers correctly.' },
                    { question: '13. What HTTP status code indicates that the requester is authenticated but lacks authorization permissions to access a resource?', options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '405 Method Not Allowed'], correct: 1, explanation: '401 means unauthenticated (identity unknown); 403 means authenticated but access is denied (identity verified, permission lacking).' },
                    { question: '14. What occurs when calling res.send() followed by another res.json() within the same Express handler execution path?', options: ['The second response overwrites the first', 'Throws: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"', 'Express ignores the first response', 'Node reboots automatically'], correct: 1, explanation: 'Once HTTP headers have been dispatched to the client socket, attempting to send another response header or body throws ERR_HTTP_HEADERS_SENT.' },
                    { question: '15. How does Cross-Origin Resource Sharing (CORS) protect web users?', options: ['It prevents servers from making outbound calls', 'It informs browsers via HTTP response headers whether frontend origins are allowed to read the cross-origin response payload', 'It stops SQL injection attacks', 'It encrypts the DNS lookup'], correct: 1, explanation: 'CORS is a browser security mechanism that uses HTTP headers to restrict cross-origin access to server resources.' }
                ]
            }
        },
   {
            id: 'sec-databases',
            title: '9. Databases & Data Modeling',
            topics: [
                {
                    name: 'Relational DBs & PostgreSQL Internals',
                    definition: 'Relational Database Management Systems (RDBMS) organize data into structured tables with fixed schemas, enforcing relational integrity and ACID guarantees.',
                    concept: '<p>PostgreSQL uses Multi-Version Concurrency Control (MVCC) to ensure reads never block writes and writes never block reads. Write-Ahead Logging (WAL) guarantees durability by recording changes to disk before updating data files.</p>',
                    syntax: 'CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);',
                    example: 'SELECT u.id, u.email, COUNT(o.id) AS total_orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.email\nHAVING COUNT(o.id) > 5;',
                    output: 'Aggregated relational dataset with user IDs and corresponding high-volume order counts.',
                    keyPoints: [
                        'ACID: Atomicity (all or nothing), Consistency (rules enforced), Isolation (concurrent safety), Durability (persisted on disk).',
                        'MVCC creates row snapshots on updates rather than locking rows directly in memory.',
                        'Always store timestamps using TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ).'
                    ],
                    mistakes: [
                        'Using VARCHAR without length limits or TEXT for primary keys in high-throughput tables.',
                        'Not vacuuming PostgreSQL tables, leading to table bloat caused by dead MVCC row versions.'
                    ],
                    practiceQuestions: [
                        { title: 'Schema Design', desc: 'Design an e-commerce schema with users, orders, and order_items with proper foreign keys and ON DELETE CASCADE constraints.' }
                    ]
                },
                {
                    name: 'SQL Indexing & Query Optimization',
                    definition: 'Indexes are specialized auxiliary data structures (primarily B-Trees) that accelerate row retrieval without scanning entire tables sequentially.',
                    concept: '<p>Without an index, the query engine performs an expensive Sequential Scan (O(N)). A B-Tree index facilitates O(log N) searches. EXPLAIN ANALYZE reveals actual query execution plans, buffer usage, and index scans.</p>',
                    syntax: 'CREATE INDEX idx_users_email ON users(email);\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = \'test@example.com\';',
                    example: '-- Composite Index for filtering and sorting\nCREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);\n\nEXPLAIN ANALYZE\nSELECT * FROM orders\nWHERE user_id = \'usr_101\'\nORDER BY created_at DESC\nLIMIT 10;',
                    output: 'Index Scan using idx_orders_user_created on orders (actual time=0.042..0.048 rows=10)',
                    keyPoints: [
                        'Composite indexes follow the Leftmost Prefix rule: (A, B) accelerates queries on (A) and (A, B), but not (B) alone.',
                        'Indexes accelerate read queries but introduce write overhead on INSERT, UPDATE, and DELETE operations.',
                        'Use Partial Indexes (WHERE is_active = true) to minimize index size on large datasets.'
                    ],
                    mistakes: [
                        'Over-indexing every column on high-velocity tables, severely degrading insert/update performance.',
                        'Wrapping indexed columns in functions (e.g., WHERE LOWER(email) = ...) without creating functional indexes.'
                    ],
                    practiceQuestions: [
                        { title: 'Query Plan Audit', desc: 'Run EXPLAIN ANALYZE on an unindexed column, apply a B-Tree index, and contrast execution times and cost metrics.' }
                    ]
                },
                {
                    name: 'Transactions & ACID Isolation Levels',
                    definition: 'A database transaction is a sequence of read and write operations treated as a single indivisible unit of work satisfying ACID principles.',
                    concept: '<p>SQL defines 4 Isolation Levels: Read Uncommitted (allows dirty reads), Read Committed (default; avoids dirty reads), Repeatable Read (avoids non-repeatable reads), and Serializable (eliminates phantom reads via strict serialization).</p>',
                    syntax: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;',
                    example: 'BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nSELECT balance FROM accounts WHERE id = 1 FOR UPDATE;\n-- Performs business check and updates\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nCOMMIT;',
                    output: 'Atomic debit-credit transfer locked via SELECT FOR UPDATE, ensuring no race conditions.'
                    ,
                    keyPoints: [
                        'Deadlocks happen when concurrent transactions hold locks the other needs; databases detect and abort one.',
                        'SELECT ... FOR UPDATE locks specific rows against concurrent modifications until transaction commit.',
                        'Pessimistic locking uses database locks; Optimistic locking uses row version numbers.'
                    ],
                    mistakes: [
                        'Holding long-running external API network calls inside database transaction blocks.',
                        'Ignoring deadlocks in client applications without configuring automated retry mechanisms.'
                    ],
                    practiceQuestions: [
                        { title: 'Bank Transfer Simulation', desc: 'Write a transaction that safely moves money between two accounts with proper error handling and ROLLBACK.' }
                    ]
                },
                {
                    name: 'Document Databases (MongoDB) & NoSQL',
                    definition: 'NoSQL document databases store semi-structured, schema-flexible data formatted as JSON/BSON documents instead of rigid relational tables.',
                    concept: '<p>MongoDB uses Collections of Documents. Data modeling centers on Embedding (for 1-to-1 or bounded 1-to-few relationships) versus Referencing (for high-cardinality 1-to-many or many-to-many relationships).</p>',
                    syntax: 'db.users.insertOne({ name: "Anjani", skills: ["JS", "Node"] });\ndb.users.find({ skills: "JS" });',
                    example: 'db.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: { _id: "$customer_id", totalSpent: { $sum: "$total" } } },\n  { $sort: { totalSpent: -1 } },\n  {$limit: 5 }\n]);',
                    output: 'Returns top 5 customer IDs ranked by total monetary expenditure.',
                    keyPoints: [
                        'MongoDB documents have a 16MB maximum size limit (use GridFS for larger files).',
                        'Aggregation Pipelines process documents through stages ($match, $group,$sort, $project,$lookup).',
                        'Embedding favors read performance (fewer queries); Referencing prevents unbounded array growth.'
                    ],
                    mistakes: [
                        'Allowing embedded arrays to grow unbounded indefinitely, leading to high document mutation overhead and size limits.',
                        'Treating MongoDB as a relational database by designing hundreds of cross-collection $lookup joins.'
                    ],
                    practiceQuestions: [
                        { title: 'Aggregation Pipeline', desc: 'Write a MongoDB aggregation pipeline that groups products by category and calculates average price.' }
                    ]
                },
                {
                    name: 'ORMs, ODMs & Connection Pooling',
                    definition: 'Object-Relational Mapping (Prisma, Drizzle, TypeORM, Mongoose) maps database entities to programming language objects with compile-time type safety.',
                    concept: '<p>Connection Pooling manages a cache of active, persistent database connections to handle concurrent queries efficiently without paying the expensive TCP/TLS connection handshake cost per request.</p>',
                    syntax: '// Prisma Query\nconst user = await prisma.user.findUnique({\n  where: { email: "dev@example.com" },\n  include: { posts: true }\n});',
                    example: 'import { Pool } from "pg";\nconst pool = new Pool({\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000,\n});\nconst client = await pool.connect();\ntry {\n  const res = await client.query("SELECT NOW()");\n} finally {\n  client.release();\n}',
                    output: 'Reuses persistent connection pool without establishing new database sockets.',
                    keyPoints: [
                        'The N+1 Query Problem happens when an ORM executes 1 query for a parent record and N additional queries for each related child.',
                        'Always release pooled connections in a finally block to prevent connection pool exhaustion.',
                        'Drizzle ORM offers lightweight SQL-like syntax; Prisma provides end-to-end type safety.'
                    ],
                    mistakes: [
                        'Creating a new database connection instance per incoming HTTP request instead of sharing a singleton pool.',
                        'Blindly relying on ORMs without auditing generated SQL queries for unintended N+1 patterns.'
                    ],
                    practiceQuestions: [
                        { title: 'N+1 Problem Fix', desc: 'Identify an N+1 query issue in an ORM query and refactor it using eager loading (include/JOIN).' }
                    ]
                },
                {
                    name: 'Caching Strategies with Redis',
                    definition: 'Redis is an in-memory, key-value data structure store utilized as a cache, message broker, and fast temporary session layer.',
                    concept: '<p>Caching sits between application servers and primary databases. Strategies include Cache-Aside (Lazy Loading), Write-Through, and Write-Behind. Cache Invalidation relies on Time-To-Live (TTL) and eviction policies (LRU/LFU).</p>',
                    syntax: 'import Redis from "ioredis";\nconst redis = new Redis();\nawait redis.set("user:101", JSON.stringify(data), "EX", 3600);',
                    example: 'async function getUser(id) {\n  const cacheKey = user:${id};\n  const cached = await redis.get(cacheKey);\n  if (cached) return JSON.parse(cached);\n\n  const dbUser = await db.query("SELECT * FROM users WHERE id = $1", [id]);\n  await redis.set(cacheKey, JSON.stringify(dbUser), "EX", 600);\n  return dbUser;\n}',
                    output: 'Sub-millisecond read responses on subsequent requests from in-memory Redis cache.',
                    keyPoints: [
                        'Cache Invalidation is one of the hardest problems in distributed systems; always set a sensible TTL.',
                        'Cache Stampede (Thundering Herd) occurs when thousands of concurrent requests miss the cache simultaneously when a key expires.',
                        'Redis supports rich data types: Strings, Hashes, Lists, Sets, and Sorted Sets (ZSETs).'
                    ],
                    mistakes: [
                        'Caching data indefinitely without TTL expirations, resulting in stale data and Redis memory exhaustion.',
                        'Treating Redis as a permanent primary database without configuring snapshot (RDB) or Append-Only File (AOF) persistence.'
                    ],
                    practiceQuestions: [
                        { title: 'Rate Limiter with Redis', desc: 'Implement a sliding-window rate limiter using Redis sorted sets (ZADD, ZREMRANGEBYSCORE).' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 9 Comprehensive Assessment: Relational & Document Databases',
                questions: [
                    { question: '1. What mechanism in PostgreSQL allows reads and writes to proceed concurrently without locking each other?', options: ['Two-Phase Locking', 'Multi-Version Concurrency Control (MVCC)', 'Single-Threaded Loop', 'Write-Only Locking'], correct: 1, explanation: 'MVCC maintains multiple versions of row records, ensuring query snapshots see consistent state without taking table locks.' },
                    { question: '2. What is the fundamental role of Write-Ahead Logging (WAL) in relational databases?', options: ['Compresses images', 'Records data modifications on durable disk storage before they are committed to database files, ensuring Durability', 'Encrypts user passwords', 'Performs DNS resolution'], correct: 1, explanation: 'WAL ensures ACID Durability; if the server crashes, changes can be cleanly reconstructed by replaying the log.' },
                    { question: '3. If a composite index is declared as (department_id, employee_id), which of the following queries CANNOT leverage the index efficiently?', options: ['WHERE department_id = 5', 'WHERE department_id = 5 AND employee_id = 12', 'WHERE employee_id = 12', 'ORDER BY department_id, employee_id'], correct: 2, explanation: 'Under the Leftmost Prefix rule, a composite index cannot be used if the leading column (department_id) is omitted from the filter.' },
                    { question: '4. What SQL command reveals the actual execution plan, node operations, and timing metrics of a query?', options: ['DESCRIBE QUERY', 'EXPLAIN ANALYZE', 'SHOW LOGS', 'OPTIMIZE TABLE'], correct: 1, explanation: 'EXPLAIN ANALYZE executes the statement and displays the execution plan along with actual runtimes and row counts for each operation.' },
                    { question: '5. What anomaly occurs when Transaction A reads a row, Transaction B modifies it and commits, and Transaction A reads the same row again obtaining different data?', options: ['Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Write Skew'], correct: 1, explanation: 'A Non-Repeatable Read happens when re-reading the same row within a transaction produces modified values because another transaction committed in between.' },
                    { question: '6. What does the SELECT ... FOR UPDATE statement achieve in a transaction?', options: ['Updates rows immediately without commit', 'Acquires exclusive row-level locks on selected rows until the current transaction commits or rolls back', 'Deletes selected records', 'Bypasses the WAL log'], correct: 1, explanation: 'SELECT FOR UPDATE prevents other transactions from modifying or locking the selected rows until the current transaction completes.' },
                    { question: '7. What is the maximum document size limit for a single BSON document in MongoDB?', options: ['4 MB', '16 MB', '64 MB', 'Unlimited'], correct: 1, explanation: 'MongoDB enforces a 16MB document size limit to prevent oversized in-memory allocations and maintain rapid network transit.' },
                    { question: '8. In MongoDB data modeling, when should you prefer Referencing over Embedding?', options: ['When documents are always read together', 'For high-cardinality relationships (e.g., 1-to-millions) or when related data is frequently updated independently', 'When relationships are strictly 1-to-1', 'Never; Embedding is always superior'], correct: 1, explanation: 'Referencing prevents unbounded array growth and avoids exceeding the 16MB limit when dealing with large or high-frequency relationships.' },
                    { question: '9. What is the N+1 Query Problem in ORMs?', options: ['An error caused by exceeding database connection limits', 'An architectural flaw where 1 query fetches parent rows followed by N separate queries to load related child records', 'Running more than N tables in a schema', 'A memory leak in connection pools'], correct: 1, explanation: 'The N+1 problem occurs when fetching N records causes N+1 roundtrips to the database instead of a single JOIN or batch IN query.' },
                    { question: '10. Why is connection pooling crucial for backend services connecting to relational databases?', options: ['It compresses database files', 'It eliminates the high latency and CPU overhead of establishing fresh TCP/TLS database connections on every single HTTP request', 'It bypasses database authentication', 'It replaces database backups'], correct: 1, explanation: 'Establishing database connections is resource-intensive; pooling reuses existing warm sockets across incoming requests.' },
                    { question: '11. What is the Cache-Aside (Lazy Loading) pattern?', options: ['Writing data to cache only and never to the database', 'The application checks the cache first; on a miss, reads from the database, writes the result to cache, and returns it', 'Automatically refreshing the database every hour', 'Clearing cache on every write'], correct: 1, explanation: 'Cache-Aside fetches data on demand: read cache -> miss -> read DB -> populate cache -> return data.' },
                    { question: '12. What phenomenon happens when a popular cached key with a high request rate expires, causing thousands of queries to slam the primary database simultaneously?', options: ['Cache Stampede (Thundering Herd)', 'Cache Invalidation', 'Deadlock Error', 'Memory Overflow'], correct: 0, explanation: 'A Cache Stampede occurs when many concurrent workers simultaneously discover a cache miss and overwhelm the DB.' },
                    { question: '13. What PostgreSQL vacuuming process cleans up dead row versions left behind by MVCC updates and deletes?', options: ['VACUUM', 'CLEANUP TABLE', 'PURGE LOGS', 'DROP DEAD ROWS'], correct: 0, explanation: 'VACUUM reclaims storage occupied by dead tuples so space can be reused for future row insertions.' },
                    { question: '14. What does ACID Atomicity guarantee?', options: ['All operations in a transaction succeed completely, or none are applied (all-or-nothing)', 'Queries run at atomic clock speed', 'Data is stored in single bytes', 'Tables have primary keys'], correct: 0, explanation: 'Atomicity ensures that if any statement in a transaction fails, the entire transaction is rolled back with zero partial side-effects.' },
                    { question: '15. Which Redis data structure is ideal for maintaining a real-time leaderboard sorted by user scores?', options: ['Lists', 'Hashes', 'Sorted Sets (ZSET)', 'Bitmaps'], correct: 2, explanation: 'Sorted Sets (ZSETs) associate each member with a floating-point score and maintain automatic sorted order with O(log N) operations.' }
                ]
            }
        },
    {
            id: 'sec-system-design',
            title: '10. System Design & Microservices',
            topics: [
                {
                    name: 'Scalability: Vertical vs Horizontal',
                    definition: 'Scalability is the capability of a system to handle growing workloads by adding hardware resources without degrading user performance.',
                    concept: '<p>Vertical Scaling (Scale-Up) upgrades CPU, RAM, or storage on a single machine (hits physical hardware ceilings and introduces a single point of failure). Horizontal Scaling (Scale-Out) adds multiple stateless commodity server instances behind reverse proxies and load balancers.</p>',
                    syntax: '[Traffic] ---> [Load Balancer] ---> [Instance 1, Instance 2, Instance 3]',
                    example: '// Stateless Architecture Pattern\n// Store user sessions externally in distributed Redis, not local Node.js memory\nimport Redis from "ioredis";\nconst redis = new Redis(process.env.REDIS_URL);\n\nexport async function getSession(token) {\n  const session = await redis.get(sess:${token});\n  return session ? JSON.parse(session) : null;\n}',
                    output: 'Enables any stateless node in a 50-instance auto-scaling cluster to service the user request.',
                    keyPoints: [
                        'Stateless servers are strictly mandatory for seamless horizontal scaling.',
                        'Auto-scaling groups add or remove instances dynamically based on CPU, RAM, or request thresholds.',
                        'Vertical scaling involves downtime for hardware upgrades; horizontal scaling provides zero-downtime rolling updates.'
                    ],
                    mistakes: [
                        'Storing local uploaded files or user sessions on the local server disk instead of shared object stores (S3) or Redis.',
                        'Assuming horizontal scaling automatically scales the database without read replicas or sharding.'
                    ],
                    practiceQuestions: [
                        { title: 'Stateless Refactoring', desc: 'Convert an in-memory Express session store to a distributed Redis session store.' }
                    ]
                },
                {
                    name: 'Load Balancing & Reverse Proxies',
                    definition: 'Reverse proxies (Nginx, HAProxy, AWS ALB) sit in front of backend servers to terminate SSL/TLS, compress data, and distribute traffic evenly across healthy nodes.',
                    concept: '<p>Load balancing algorithms: Round Robin (sequential), Least Connections (routes to least busy server), IP Hash (sticky sessions based on client IP), and Weighted Round Robin (accounts for server capacities).</p>',
                    syntax: 'upstream backend_cluster {\n  server 10.0.0.1:4000;\n  server 10.0.0.2:4000;\n}\nserver {\n  location / { proxy_pass http://backend_cluster; }\n}',
                    example: '# Nginx Reverse Proxy & Load Balancer configuration snippet\nupstream aura_api {\n    least_conn;\n    server api1.internal:3000 max_fails=3 fail_timeout=10s;\n    server api2.internal:3000 max_fails=3 fail_timeout=10s;\n}\nserver {\n    listen 443 ssl;\n    server_name api.auragrowth.com;\n    location / {\n        proxy_pass http://aura_api;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}',
                    output: 'Evenly distributes production HTTPS traffic across healthy internal backend nodes.',
                    keyPoints: [
                        'Reverse proxies protect backend servers by hiding internal IP addresses and network topology.',
                        'Active Health Checks automatically remove failed backend nodes from the routing pool.',
                        'Layer 4 (Transport) routes raw TCP/UDP packets; Layer 7 (Application) routes based on HTTP headers, cookies, and URI paths.'
                    ],
                    mistakes: [
                        'Relying on sticky sessions (IP Hash) instead of decoupling sessions, defeating even workload distribution.',
                        'Exposing private application microservices directly to the public internet without an API Gateway.'
                    ],
                    practiceQuestions: [
                        { title: 'Nginx Load Balancer', desc: 'Configure a local Nginx load balancer to distribute round-robin requests across two local Node.js processes.' }
                    ]
                },
                {
                    name: 'CAP Theorem & PACELC',
                    definition: 'The fundamental theorem stating a distributed data store can simultaneously guarantee at most two out of three attributes: Consistency, Availability, and Partition Tolerance.',
                    concept: '<p>Network Partitions (P) are unavoidable across distributed networks. Therefore, systems must choose between Consistency (CP - reject writes to preserve exact synchronized state) or Availability (AP - accept writes, returning potentially stale data via Eventual Consistency).</p>',
                    syntax: 'Network Partition Occurs ---> Choose: Consistency (CP) OR Availability (AP)',
                    example: '// PACELC Example:\n// If Partition (P): choose Availability (A) or Consistency (C)\n// Else (E): choose Latency (L) or Consistency (C)\n// DynamoDB/Cassandra: PA/EL (favors low latency and high availability)\n// Spanner/RDBMS: PC/EC (favors strict data consistency)',
                    output: 'Guides architectural trade-offs between zero data discrepancies versus 100% uptime.',
                    keyPoints: [
                        'Partition Tolerance (P) is mandatory in real-world distributed networks due to hardware/switch drops.',
                        'Strong Consistency (CP) ensures all reads receive the most recent write; used in banking and ledgers.',
                        'Eventual Consistency (AP) ensures reads return quickly and state converges over time; used in social media feeds.'
                    ],
                    mistakes: [
                        'Claiming a system provides CA across distributed networks (network partitions cannot be prevented).',
                        'Choosing strict CP for systems where momentary stale reads are completely acceptable (causing unnecessary downtime).'
                    ],
                    practiceQuestions: [
                        { title: 'Architecture Trade-Off Analysis', desc: 'Analyze whether an e-commerce inventory service requires a CP or AP consistency model during flash sales.' }
                    ]
                },
                {
                    name: 'Message Queues & Event-Driven Systems',
                    definition: 'Asynchronous communication brokers (RabbitMQ, Apache Kafka, AWS SQS) that decouple producers from consumers to handle background processing and traffic spikes.',
                    concept: '<p>Producers push messages onto message queues or streaming topics. Consumer workers read and process jobs asynchronously. Dead Letter Queues (DLQ) isolate corrupted or persistently failing messages for inspection.</p>',
                    syntax: 'Producer ---> [Message Queue / Kafka Topic] ---> Worker Pool',
                    example: '// RabbitMQ Job Publisher\nimport amqp from "amqplib";\n\nasync function dispatchEmailJob(payload) {\n  const conn = await amqp.connect("amqp://localhost");\n  const channel = await conn.createChannel();\n  const queue = "email_notifications";\n  \n  await channel.assertQueue(queue, { durable: true });\n  channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });\n  console.log("Job queued safely.");\n}\n\ndispatchEmailJob({ to: "anjani@aura.com", template: "welcome_onboarding" });',
                    output: 'Job queued safely in durable message queue for decoupled background worker consumption.',
                    keyPoints: [
                        'Queues smooth out sudden traffic spikes (traffic leveling / buffer smoothing).',
                        'Message persistence and acknowledgments (ACK) guarantee at-least-once message delivery.',
                        'Idempotent Consumers ensure that receiving duplicate messages produces the exact same outcome without errors.'
                    ],
                    mistakes: [
                        'Executing slow tasks (PDF generation, email dispatch, video transcoding) synchronously inside HTTP request cycles.',
                        'Not setting up a Dead Letter Queue (DLQ), causing a poison pill message to block consumer workers indefinitely.'
                    ],
                    practiceQuestions: [
                        { title: 'Asynchronous Worker', desc: 'Build an Express route that offloads image processing to a queue and returns an immediate 202 Accepted response.' }
                    ]
                },
                {
                    name: 'Database Sharding & Read Replicas',
                    definition: 'Strategies to distribute database read and write workloads across multiple database clusters when single-node limits are exceeded.',
                    concept: '<p>Read Replicas replicate data asynchronously from a primary master node, offloading heavy read queries. Sharding (Horizontal Partitioning) breaks large tables across multiple database nodes using a Shard Key (Hash-based or Range-based).</p>',
                    syntax: '[Write Traffic] ---> [Primary DB Master] ---> Asynchronous Replication ---> [Read Replica 1, Read Replica 2]',
                    example: '// Hash-Based Database Sharding Logic\nimport crypto from "crypto";\n\nconst shards = ["db_shard_us_east", "db_shard_eu_central", "db_shard_ap_south"];\n\nfunction getShardForUser(userId) {\n  const hash = crypto.createHash("md5").update(userId).digest("hex");\n  const shardIndex = parseInt(hash.substring(0, 8), 16) % shards.length;\n  return shards[shardIndex];\n}\n\nconsole.log(getShardForUser("user_anjani_991"));',
                    output: 'Routes record read/write traffic deterministically to: db_shard_ap_south',
                    keyPoints: [
                        'Read replicas scale read bandwidth; they do not improve write performance.',
                        'Replication Lag can cause a user to read stale data immediately after writing (read-your-own-writes hazard).',
                        'Consistent Hashing minimizes data redistribution when adding or removing shards from a cluster.'
                    ],
                    mistakes: [
                        'Selecting a poor shard key with low cardinality (e.g., country code), causing hot shards and uneven traffic loads.',
                        'Attempting cross-shard JOIN queries across independent databases (causes massive latency and network bottlenecks).'
                    ],
                    practiceQuestions: [
                        { title: 'Consistent Hashing Simulator', desc: 'Implement a consistent hashing ring mapping 10,000 keys across 4 database nodes.' }
                    ]
                },
                {
                    name: 'API Gateways & Microservices Patterns',
                    definition: 'Design blueprints for splitting large monolithic systems into independent, loosely coupled, domain-driven microservices.',
                    concept: '<p>The API Gateway acts as a single entry point handling cross-cutting concerns: routing, authentication, rate limiting, and request composition. Resilience patterns include Circuit Breaker, Bulkhead, and Saga Pattern (distributed transactions).</p>',
                    syntax: '[Client App] ---> [API Gateway] ---> [Auth Service | Billing Service | Course Service]',
                    example: '// Circuit Breaker Pattern Concept\nclass CircuitBreaker {\n  constructor(requestFn, failureThreshold = 5, cooldownPeriod = 10000) {\n    this.requestFn = requestFn;\n    this.failureThreshold = failureThreshold;\n    this.cooldownPeriod = cooldownPeriod;\n    this.failureCount = 0;\n    this.state = "CLOSED"; // CLOSED, OPEN, HALF-OPEN\n    this.nextAttempt = Date.now();\n  }\n  async call(...args) {\n    if (this.state === "OPEN") {\n      if (Date.now() > this.nextAttempt) this.state = "HALF-OPEN";\n      else throw new Error("Circuit is OPEN: Service degraded. Returning fallback.");\n    }\n    try {\n      const res = await this.requestFn(...args);\n      this.failureCount = 0;\n      this.state = "CLOSED";\n      return res;\n    } catch (err) {\n      this.failureCount++;\n      if (this.failureCount >= this.failureThreshold) {\n        this.state = "OPEN";\n        this.nextAttempt = Date.now() + this.cooldownPeriod;\n      }\n      throw err;\n    }\n  }\n}',
                    output: 'Shields services from cascading failures by failing fast when downstream services become unresponsive.',
                    keyPoints: [
                        'Circuit Breaker transitions through Closed &rarr; Open &rarr; Half-Open states.',
                        'The Saga Pattern manages distributed transactions using a sequence of local transactions and compensating rollbacks.',
                        'Database-per-service pattern ensures microservices remain fully decoupled with private datastores.'
                    ],
                    mistakes: [
                        'Allowing multiple microservices to access and modify the same shared database instance directly.',
                        'Migrating to microservices prematurely before domain boundaries and operational maturity are established.'
                    ],
                    practiceQuestions: [
                        { title: 'Saga Compensating Action', desc: 'Design a checkout saga with compensating rollback steps for when an inventory reservation fails after payment approval.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 10 Comprehensive Assessment: System Design & Enterprise Architecture',
                questions: [
                    { question: '1. What architectural requirement is strictly necessary for a backend application tier to scale horizontally across multiple instances?', options: ['Application servers must maintain persistent state in local memory', 'Application instances must be completely stateless, delegating state to databases or external caches', 'All servers must run on the exact same physical motherboard', 'Servers must not use TLS encryption'], correct: 1, explanation: 'Stateless servers allow any request to be routed to any healthy instance without loss of session context.' },
                    { question: '2. Which load balancing algorithm directs incoming traffic to the server currently handling the fewest active connections?', options: ['Round Robin', 'Least Connections', 'Random Selection', 'IP Hash'], correct: 1, explanation: 'Least Connections evaluates current active open connections on each backend node and forwards new traffic to the least burdened server.' },
                    { question: '3. What does the CAP theorem state regarding network partitions in distributed databases?', options: ['Network partitions can be eliminated using fiber cables', 'When a network partition occurs, a system must choose between Consistency and Availability', 'Distributed systems can guarantee Consistency, Availability, and Partition Tolerance simultaneously', 'Partition Tolerance is only required for relational databases'], correct: 1, explanation: 'Partitions (dropped or delayed packets between nodes) are inevitable; systems must decide to reject requests (CP) or accept writes with stale reads (AP).' },
                    { question: '4. What does the PACELC theorem add to the traditional CAP theorem?', options: ['It considers Latency and Consistency trade-offs even during normal, non-partitioned operation (Else)', 'It adds Power and Compute variables', 'It eliminates Partition Tolerance', 'It applies only to serverless architectures'], correct: 0, explanation: 'PACELC states: if Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C).' },
                    { question: '5. What is the role of a Dead Letter Queue (DLQ) in an asynchronous message-driven system?', options: ['Stores deleted customer accounts', 'Captures messages that fail processing repeatedly due to errors or format corruption for subsequent inspection without blocking queues', 'Speeds up queue network bandwidth', 'Runs database garbage collection'], correct: 1, explanation: 'A DLQ isolates problematic or repeatedly rejected messages (poison pills) so worker queues can continue uninterrupted.' },
                    { question: '6. Why should consumers of message queues always be implemented as Idempotent operations?', options: ['Because message queues may deliver duplicate messages under network retries and at-least-once delivery guarantees', 'To make messages smaller', 'To encrypt message payloads', 'To prevent CPU overheating'], correct: 0, explanation: 'Distributed messaging guarantees at-least-once delivery; idempotent handlers ensure duplicate message processing creates no unintended side effects.' },
                    { question: '7. What is the primary limitation of adding Read Replicas to a database cluster?', options: ['Read Replicas do not scale read bandwidth', 'Read Replicas do not scale write throughput, as all writes must still pass through the primary master node', 'Read Replicas disable indexes', 'Read Replicas can only store 10,000 rows'], correct: 1, explanation: 'Replicas offload SELECT queries but do not solve write bottlenecks since writes are funneled through the single master.' },
                    { question: '8. In database sharding, what catastrophic problem occurs when a poorly chosen Shard Key has uneven data distribution?', options: ['Network cables disconnect', 'Hotspots (hot shards), where a single database shard receives a disproportionate majority of traffic and exhausts its resources', 'Data becomes automatically encrypted', 'WAL logs stop writing'], correct: 1, explanation: 'A low-cardinality or skewed shard key directs the bulk of read/write operations to one shard, defeating horizontal distribution.' },
                    { question: '9. What problem does Consistent Hashing solve when managing distributed cache or database clusters?', options: ['It replaces SQL JOIN queries', 'It ensures that adding or removing a node requires remapping only K/N keys rather than redistributing all keys across the cluster', 'It encrypts database passwords', 'It forces all queries to run in memory'], correct: 1, explanation: 'Consistent hashing maps keys and nodes onto a circular ring, minimizing the data re-shuffling required when cluster size changes.' },
                    { question: '10. How does the Circuit Breaker pattern protect microservices architectures from cascading failures?', options: ['It disconnects internet access during peak hours', 'It detects downstream service failures and immediately returns fallback errors (fails fast) without waiting for timeouts and exhausting server threads', 'It resets the database schema', 'It restarts the physical server automatically'], correct: 1, explanation: 'The circuit breaker opens after repeated failures, stopping calls to failing services and preventing thread pool exhaustion.' },
                    { question: '11. In the Saga pattern, how are distributed multi-service transactions rolled back when an intermediate step fails?', options: ['By executing a 2-Phase Commit database lock', 'By invoking compensating transactions that semantically undo the changes made by earlier completed steps', 'By restoring daily database backups', 'By rebooting the API Gateway'], correct: 1, explanation: 'Sagas execute forward transactions step-by-step; if a step fails, compensating actions are executed in reverse to return to a consistent state.' },
                    { question: '12. What is the core principle of the Database-per-Service pattern in microservices?', options: ['All microservices share a single large PostgreSQL database instance', 'Each microservice owns and encapsulates its private datastore, accessible only through its public API endpoints', 'Microservices cannot use databases', 'Databases must run on local client machines'], correct: 1, explanation: 'Private databases ensure loose coupling and independent schema evolution, preventing services from binding to each other\'s internal tables.' },
                    { question: '13. What is the primary operational difference between a Layer 4 (L4) and Layer 7 (L7) load balancer?', options: ['L4 inspects HTTP cookies; L7 does not', 'L4 routes traffic based on network IP and TCP/UDP ports without inspecting packet payloads; L7 inspects HTTP headers, URLs, and cookies', 'L4 is slower than L7', 'L7 cannot terminate SSL certificates'], correct: 1, explanation: 'L4 operates at the transport layer (pure TCP routing); L7 operates at the application layer, enabling intelligent URI and cookie-based routing.' },
                    { question: '14. What occurs when a client experiences Replication Lag in a Primary-Replica database setup?', options: ['The primary database shuts down', 'The client writes data to the primary master but immediately reads stale data from a replica that has not yet caught up', 'Network packets double in size', 'The query throws a syntax error'], correct: 1, explanation: 'Asynchronous replication introduces a brief delay before replicas reflect the latest writes from the master node.' },
                    { question: '15. What is the main responsibility of an API Gateway in enterprise systems?', options: ['Compiling frontend TypeScript code', 'Providing a centralized reverse proxy handling routing, authentication, rate limiting, SSL termination, and protocol translation for client requests', 'Replacing the backend database engine', 'Managing local client browser cookies'], correct: 1, explanation: 'The API Gateway shields internal microservice complexity behind a unified, secured, and monitored edge routing layer.' }
                ]
            }
        },
   {
            id: 'sec-testing-qa',
            title: '11. Testing & Quality Assurance',
            topics: [
                {
                    name: 'Testing Pyramid & Strategy',
                    definition: 'The Testing Pyramid is an architectural framework categorizing automated software tests into Unit Tests, Integration Tests, and End-to-End (E2E) Tests based on speed, cost, and scope.',
                    concept: '<p>The pyramid advises maintaining a massive base of fast, cheap Unit Tests, a moderate layer of Integration Tests verifying cross-module boundaries, and a slim suite of realistic, browser-driven E2E Tests at the apex.</p>',
                    syntax: 'Unit Tests (70%) > Integration Tests (20%) > E2E Tests (10%)',
                    example: '// Jest Unit Test Example\nimport { calculateDiscount } from "./pricing";\n\ndescribe("calculateDiscount", () => {\n  it("should apply 20% discount on orders above 1000", () => {\n    const total = calculateDiscount(1200, 0.2);\n    expect(total).toBe(960);\n  });\n});',
                    output: 'PASS src/pricing.test.ts (1.2s)\n✓ should apply 20% discount on orders above 1000 (3ms)',
                    keyPoints: [
                        'Unit tests isolate single functions or pure classes from all external systems.',
                        'Integration tests verify database persistence, caching, and API routing interactions.',
                        'E2E tests run entire applications in headless browser environments simulating actual user behavior.'
                    ],
                    mistakes: [
                        'Inverted Testing Ice-Cream Cone anti-pattern: having hundreds of slow, brittle E2E tests and zero unit tests.',
                        'Relying purely on manual QA testing before production deployments.'
                    ],
                    practiceQuestions: [
                        { title: 'Pyramid Audit', desc: 'Classify an existing project test suite and calculate its unit-to-E2E distribution ratio.' }
                    ]
                },
                {
                    name: 'Unit Testing with Jest & Vitest',
                    definition: 'Unit testing validates the correctness of individual pure functions, isolated logic units, and data transformers without external system dependencies.',
                    concept: '<p>Modern suites use Vitest (native ESM/Vite engine) or Jest. Tests follow the AAA Pattern: Arrange (setup inputs/mocks), Act (invoke target function), and Assert (verify resulting output matches expectations).</p>',
                    syntax: 'test("description", () => {\n  // Arrange\n  const val = 5;\n  // Act\n  const res = double(val);\n  // Assert\n  expect(res).toBe(10);\n});',
                    example: 'import { describe, it, expect } from "vitest";\n\nfunction sanitizeUsername(raw) {\n  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");\n}\n\ndescribe("sanitizeUsername", () => {\n  it("removes whitespace and special characters", () => {\n    expect(sanitizeUsername("  Anjani@99! ")).toBe("anjani99");\n  });\n});',
                    output: '✓ sanitizeUsername > removes whitespace and special characters (2ms)',
                    keyPoints: [
                        'Unit tests should run in milliseconds and execute with zero network or filesystem calls.',
                        'Assertions should test edge cases: null values, empty strings, boundary limits, and zero.',
                        'Code coverage tools (Istanbul/c8) measure statement, branch, and line coverage percentages.'
                    ],
                    mistakes: [
                        'Testing internal implementation details (private methods) instead of public observable behavior.',
                        'Writing tests with shared mutable state across test cases that cause intermittent test pollution.'
                    ],
                    practiceQuestions: [
                        { title: 'TDD Kata', desc: 'Implement a string calculator using Test-Driven Development (Red-Green-Refactor cycle).' }
                    ]
                },
                {
                    name: 'Mocking, Spies & Stubs',
                    definition: 'Test doubles that substitute real external dependencies (databases, third-party APIs, disk I/O) to isolate target logic and assert side effects.',
                    concept: '<p>Mocks supply pre-programmed expectations; Stubs return hardcoded data payloads; Spies observe real function execution details (invocation count, arguments received, and returned values).</p>',
                    syntax: 'const mockFn = vi.fn().mockResolvedValue({ status: 200 });\nvi.spyOn(console, "error").mockImplementation(() => {});',
                    example: 'import { vi, test, expect } from "vitest";\nimport { registerUser } from "./authService";\nimport * as emailModule from "./emailClient";\n\ntest("registerUser sends welcome email", async () => {\n  const spy = vi.spyOn(emailModule, "sendEmail").mockResolvedValue(true);\n  await registerUser("dev@aura.com");\n  expect(spy).toHaveBeenCalledWith("dev@aura.com", "Welcome!");\n  spy.mockRestore();\n});',
                    output: '✓ registerUser sends welcome email (8ms)',
                    keyPoints: [
                        'Always restore or reset mocks between test runs (vi.restoreAllMocks()) to prevent state bleed.',
                        'Mock at the boundaries of your architecture (e.g., HTTP clients, database drivers).',
                        'Mocks verify behavior (how things interact); stubs verify state (what data returns).'
                    ],
                    mistakes: [
                        'Over-mocking so heavily that tests verify the mock configuration rather than real system logic.',
                        'Forgetting to mock external payment gateways or third-party email APIs in test suites.'
                    ],
                    practiceQuestions: [
                        { title: 'API Client Mocking', desc: 'Mock an Axios GET call with error rejection to test application retry policies.' }
                    ]
                },
                {
                    name: 'Component Testing with React Testing Library',
                    definition: 'Testing React UI components from the perspective of an end-user, focusing on user-observable behavior rather than internal component state.',
                    concept: '<p>RTL discourages testing component internal state or methods. Queries mimic user interaction by targeting elements via getByRole, getByText, or getByLabelText. User interactions are dispatched via @testing-library/user-event.</p>',
                    syntax: 'render(<Component />);\nconst btn = screen.getByRole("button", { name: /submit/i });\nawait userEvent.click(btn);',
                    example: 'import { render, screen } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport { Counter } from "./Counter";\n\ntest("increments count on click", async () => {\n  render(<Counter />);\n  const button = screen.getByRole("button", { name: /count: 0/i });\n  await userEvent.click(button);\n  expect(screen.getByRole("button", { name: /count: 1/i })).toBeInTheDocument();\n});',
                    output: 'PASS src/Counter.test.tsx - renders initial state and responds accurately to clicks.',
                    keyPoints: [
                        'Priority query order: getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId.',
                        'findBy* queries return promises and automatically retry for asynchronous elements.',
                        'user-event simulates realistic multi-stage browser events better than fireEvent.'
                    ],
                    mistakes: [
                        'Relying excessively on data-testid attributes instead of accessible roles and semantic labels.',
                        'Wrapping RTL assertions in unnecessary act() calls (RTL and userEvent wrap act internally).'
                    ],
                    practiceQuestions: [
                        { title: 'Form Submission Test', desc: 'Render a login form, type email/password with userEvent, click submit, and verify success message appearance.' }
                    ]
                },
                {
                    name: 'Integration Testing & Supertest',
                    definition: 'Testing combinations of interacting units (e.g., Express controllers, middleware pipelines, and database layers) within a unified environment.',
                    concept: '<p>Integration tests spin up lightweight test databases (or containers) and dispatch simulated HTTP requests through the Express router using Supertest, verifying real HTTP status codes, headers, and database side effects.</p>',
                    syntax: 'import request from "supertest";\nconst res = await request(app).get("/api/users");',
                    example: 'import request from "supertest";\nimport app from "./app";\n\ndescribe("POST /api/v1/auth/login", () => {\n  it("returns 401 on invalid password", async () => {\n    const res = await request(app)\n      .post("/api/v1/auth/login")\n      .send({ email: "user@aura.com", password: "wrong_password" });\n    expect(res.status).toBe(401);\n    expect(res.body.error).toBe("Invalid credentials");\n  });\n});',
                    output: 'HTTP 401 Unauthorized response verified with error payload.',
                    keyPoints: [
                        'Isolate integration test runs with dedicated ephemeral test databases to avoid polluting production data.',
                        'Run database migrations and clean tables before or after each test run (truncate tables).',
                        'Supertest bypasses physical TCP networking overhead by invoking the Express server app instance directly.'
                    ],
                    mistakes: [
                        'Running integration tests against a shared production or staging database.',
                        'Not closing database client pools or server handles at the end of the test suite (causing Jest/Vitest to hang).'
                    ],
                    practiceQuestions: [
                        { title: 'CRUD Integration Suite', desc: 'Write an integration test suite verifying full Create, Read, Update, and Delete endpoints against a test database.' }
                    ]
                },
                {
                    name: 'End-to-End Testing (Playwright & Cypress)',
                    definition: 'Automated testing framework running live applications against real headless browsers (Chromium, Firefox, WebKit) across complete user journeys.',
                    concept: '<p>Playwright executes across multiple browser tabs, handling auto-waiting for network idle, DOM attachments, and visual regressions with built-in tracing, video capture, and screenshot assertions.</p>',
                    syntax: 'import { test, expect } from "@playwright/test";\ntest("homepage checkout flow", async ({ page }) => {\n  await page.goto("https://auragrowth.com");\n  await page.click("text=Enroll");\n});',
                    example: 'import { test, expect } from "@playwright/test";\n\ntest("user login and profile navigation", async ({ page }) => {\n  await page.goto("http://localhost:3000/login");\n  await page.fill(\'input[name="email"]\', "anjani@aura.com");\n  await page.fill(\'input[name="password"]\', "SuperSecret123!");\n  await page.click(\'button[type="submit"]\');\n  await expect(page.locator("h1")).toHaveText("Welcome Back, Anjani");\n});',
                    output: 'Running 1 test using 1 worker\n✓ user login and profile navigation (2.4s)',
                    keyPoints: [
                        'Playwright automatically waits for elements to be actionable (visible, stable, enabled) before clicking.',
                        'Use Trace Viewer to inspect DOM snapshots, console logs, and network waterfalls for failing CI runs.',
                        'Run E2E tests primarily on critical business workflows (signup, checkout, core flows).'
                    ],
                    mistakes: [
                        'Using arbitrary sleep timeouts (page.waitForTimeout(5000)) instead of web-first assertions.',
                        'Writing hundreds of redundant E2E tests for simple UI edge cases that should be covered by unit tests.'
                    ],
                    practiceQuestions: [
                        { title: 'Playwright Smoke Test', desc: 'Write an E2E test verifying that an unauthenticated user attempting to access /dashboard is redirected to /login.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 11 Comprehensive Assessment: Testing & Quality Assurance',
                questions: [
                    {
                        question: '1. In the traditional Testing Pyramid, which test layer should constitute the largest volume of automated tests?',
                        options: ['End-to-End Tests', 'Manual Exploratory Tests', 'Unit Tests', 'Performance Tests'],
                        correct: 2,
                        explanation: 'Unit tests run in milliseconds, isolate single units of logic, and provide fast feedback, forming the wide foundation of the pyramid.'
                    },
                    {
                        question: '2. What is the fundamental principle of the AAA Pattern in unit testing?',
                        options: ['Always Assert Anything', 'Arrange the test data and mocks, Act on the target function, Assert the resulting expectations', 'Asynchronous API Auditing', 'Automate Application Access'],
                        correct: 1,
                        explanation: 'AAA structures tests into clear sequential phases: Arrange (setup), Act (execution), and Assert (verification).'
                    },
                    {
                        question: '3. What test double replaces real dependencies by recording execution details like call counts and received parameters?',
                        options: ['Fake', 'Stub', 'Spy', 'Dummy'],
                        correct: 2,
                        explanation: 'Spies wrap real or mock functions to inspect their calling behavior, argument passing, and invocation counts.'
                    },
                    {
                        question: '4. Why does React Testing Library prioritize getByRole over getByTestId?',
                        options: ['getByRole is faster in Chrome', 'getByRole queries elements according to the accessibility tree as an actual user or screen reader would perceive them', 'getByTestId is deprecated', 'getByRole automatically injects CSS classes'],
                        correct: 1,
                        explanation: 'Testing via accessible roles mimics actual user experience and enforces web accessibility compliance rather than testing artificial test IDs.'
                    },
                    {
                        question: '5. In React Testing Library, which query prefix returns a Promise that automatically retries until an asynchronous element appears in the DOM?',
                        options: ['getBy...', 'queryBy...', 'findBy...', 'selectBy...'],
                        correct: 2,
                        explanation: 'findBy* queries combine getBy* with waitFor, polling the DOM repeatedly until matching elements resolve or time out.'
                    },
                    {
                        question: '6. What is the primary operational advantage of Supertest when testing Express endpoints?',
                        options: ['It compiles JavaScript into C++', 'It tests Express applications in memory by binding to the server instance directly without requiring a real live network port binding', 'It automatically populates production databases', 'It intercepts SSL certificates'],
                        correct: 1,
                        explanation: 'Supertest invokes the Express app pipeline internally, bypassing external network socket allocation and speeding up test runs.'
                    },
                    {
                        question: '7. What risk is associated with over-mocking external systems in unit tests?',
                        options: ['Tests run too fast', 'Tests end up validating the behavior of the mocks rather than the real application logic, creating false confidence', 'Memory usage drops to zero', 'V8 garbage collection fails'],
                        correct: 1,
                        explanation: 'Over-mocking decouples tests from reality, leading to suites that pass despite broken production integrations.'
                    },
                    {
                        question: '8. What is the difference between shallow rendering and deep rendering in component testing?',
                        options: ['Shallow renders one component level deep without instantiating child components; deep renders the entire child tree', 'Shallow only tests CSS', 'Deep only runs in Node', 'They are synonymous terms'],
                        correct: 0,
                        explanation: 'Shallow rendering isolates the parent component completely; React Testing Library encourages deep rendering to verify realistic user interactions.'
                    },
                    {
                        question: '9. How does Playwright handle waiting for elements before executing actions like click()?',
                        options: ['Requires hardcoded time pauses (waitForTimeout)', 'Performs auto-waiting checks to ensure the element is attached, visible, stable, and enabled before interacting', 'Throws immediate errors if elements are delayed by 10ms', 'Only clicks after page reload'],
                        correct: 1,
                        explanation: 'Playwright features built-in auto-waiting, significantly reducing test flakiness by verifying element actionability.'
                    },
                    {
                        question: '10. What does Code Branch Coverage measure in a testing report?',
                        options: ['The number of Git branches merged', 'The percentage of decision points (if/else, switch branches) evaluated during test executions', 'The total lines of comments in source files', 'The count of installed npm dependencies'],
                        correct: 1,
                        explanation: 'Branch coverage calculates whether both true and false paths of every conditional evaluation were executed by the test suite.'
                    },
                    {
                        question: '11. Why is @testing-library/user-event preferred over fireEvent in React component tests?',
                        options: ['user-event is older and lighter', 'user-event dispatches complete multi-stage browser event sequences (focus, hover, keyup, keydown) reflecting realistic interactions', 'fireEvent only works on forms', 'user-event deletes the DOM'],
                        correct: 1,
                        explanation: 'fireEvent merely triggers raw DOM events, whereas user-event simulates complete end-user interaction workflows.'
                    },
                    {
                        question: '12. What is a "flaky test" in automated test engineering?',
                        options: ['A test that runs in less than 1 millisecond', 'A test that intermittently passes or fails across runs with zero changes to source code or environment', 'A test written in TypeScript', 'A test without assertions'],
                        correct: 1,
                        explanation: 'Flaky tests exhibit non-deterministic results caused by race conditions, network latency, or shared mutable state.'
                    },
                    {
                        question: '13. What is the core principle of Test-Driven Development (TDD)?',
                        options: ['Write code first, test in production', 'Follow the Red-Green-Refactor cycle: write a failing test, write minimal code to pass, then refactor', 'Write tests only after deployment', 'Eliminate all unit tests in favor of E2E'],
                        correct: 1,
                        explanation: 'TDD dictates authoring tests prior to writing functional code, driving implementation through iterative refinement.'
                    },
                    {
                        question: '14. What occurs if database connections opened during integration tests are not closed in an afterAll block?',
                        options: ['The database deletes its tables', 'The test runner process (Jest/Vitest) hangs indefinitely without terminating cleanly', 'Tests rerun automatically', 'RAM usage drops instantly'],
                        correct: 1,
                        explanation: 'Open TCP socket connections prevent the Node.js event loop from draining, keeping the test runner process alive.'
                    },
                    {
                        question: '15. What tool in Playwright allows developers to record browser steps and inspect network waterfalls and DOM snapshots for failing tests?',
                        options: ['Trace Viewer', 'Libuv Thread Pool', 'Docker Compose', 'Prisma Studio'],
                        correct: 0,
                        explanation: 'Playwright Trace Viewer captures visual screenshots, DOM snapshots, and network waterfalls for post-mortem test analysis.'
                    }
                ]
            }
        },
   {
            id: 'sec-devops-deployment',
            title: '12. DevOps & Cloud Deployment',
            topics: [
                {
                    name: 'Docker & Containerization',
                    definition: 'Docker packages applications and their complete runtime dependencies into lightweight, standalone, standardized container images that execute consistently across all environments.',
                    concept: '<p>Containers share the host operating system kernel via Linux namespaces and cgroups, eliminating the heavy hypervisor and guest OS memory overhead of traditional Virtual Machines (VMs).</p>',
                    syntax: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm", "start"]',
                    example: '# Multi-Stage Production Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/index.js"]',
                    output: 'Produces minimal production image (~80MB) stripped of devDependencies and build tooling.',
                    keyPoints: [
                        'Multi-stage builds decouple build-time compilers from minimal production execution images.',
                        'Always order Dockerfile steps so unchanged dependencies (package.json) cache prior to source files.',
                        'Never run container processes as root in production; assign a dedicated non-root user (e.g., USER node).'
                    ],
                    mistakes: [
                        'Copying local node_modules or .git folders into images (always configure a .dockerignore file).',
                        'Hardcoding secret API keys or private credentials inside Dockerfile build instructions.'
                    ],
                    practiceQuestions: [
                        { title: 'Docker Compose Setup', desc: 'Create a docker-compose.yml file orchestrating a Node.js web server, PostgreSQL database, and Redis cache.' }
                    ]
                },
                {
                    name: 'CI/CD Pipelines (GitHub Actions)',
                    definition: 'Continuous Integration and Continuous Deployment (CI/CD) automates code linting, test suites, container building, and production deployment on every push or pull request.',
                    concept: '<p>GitHub Actions pipelines are defined in YAML under .github/workflows. Workflows consist of Triggers (push, pull_request), Jobs (running in parallel or sequential dependencies), and Steps (actions or shell scripts).</p>',
                    syntax: 'name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4',
                    example: 'name: Production CI/CD\non:\n  push:\n    branches: [main]\njobs:\n  test-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: "npm"\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n      - run: npm run build',
                    output: 'Automated validation passing lint, coverage gates, and production bundles before merging.',
                    keyPoints: [
                        'Continuous Integration validates code quality before integration; Continuous Deployment pushes validated code directly to production.',
                        'Use GitHub Secrets to store sensitive deployment credentials and API tokens securely.',
                        'Cache package dependencies (npm/yarn/pnpm) to accelerate workflow execution times.'
                    ],
                    mistakes: [
                        'Deploying without running unit and integration test gates first.',
                        'Using raw npm install instead of npm ci in CI pipelines, leading to non-deterministic package installations.'
                    ],
                    practiceQuestions: [
                        { title: 'Pipeline Gatekeeper', desc: 'Write a GitHub Actions workflow that blocks PR merges if test coverage drops below 80%.' }
                    ]
                },
                {
                    name: 'Kubernetes & Container Orchestration',
                    definition: 'Kubernetes (K8s) is an open-source platform managing automated deployment, scaling, healing, and operation of containerized application clusters.',
                    concept: '<p>K8s abstracts compute into Pods (smallest deployable units), ReplicaSets (maintains desired pod counts), Deployments (handles declarative rolling updates), Services (provides stable network IPs), and Ingress (routes external HTTP traffic).</p>',
                    syntax: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: aura-api\nspec:\n  replicas: 3',
                    example: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: aura-backend\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: aura-api\n  template:\n    metadata:\n      labels:\n        app: aura-api\n    spec:\n      containers:\n      - name: api\n        image: auragrowth/api:v1.2\n        ports:\n        - containerPort: 3000\n        resources:\n          limits:\n            memory: "512Mi"\n            cpu: "500m"',
                    output: 'Schedules 3 replicated backend pods across cluster nodes with defined CPU/memory limits.',
                    keyPoints: [
                        'K8s self-heals: failing pods are automatically terminated and restarted to match desired state.',
                        'Horizontal Pod Autoscaler (HPA) scales pod count dynamically based on observed CPU and memory metrics.',
                        'ConfigMaps manage non-sensitive configuration; Secrets manage encoded credentials.'
                    ],
                    mistakes: [
                        'Omitting resource requests and limits, allowing a single rogue pod to exhaust all node memory (OOMKilled).',
                        'Failing to configure liveness and readiness probes, routing traffic to unready containers.'
                    ],
                    practiceQuestions: [
                        { title: 'K8s Cluster Manifest', desc: 'Write a complete Kubernetes Deployment and ClusterIP Service manifest for an Express application.' }
                    ]
                },
                {
                    name: 'Cloud Infrastructure & Serverless (AWS / Supabase)',
                    definition: 'Cloud platforms provide on-demand managed computing, storage, networking, and serverless compute primitives without maintaining on-premise hardware.',
                    concept: '<p>Infrastructure models span IaaS (AWS EC2), PaaS (Render, Heroku), BaaS (Supabase, Firebase), and FaaS/Serverless (AWS Lambda, Edge Functions) where cloud providers handle scaling and charging strictly per millisecond of execution.</p>',
                    syntax: '// Supabase Client Integration\nimport { createClient } from "@supabase/supabase-js";\nconst supabase = createClient(URL, KEY);',
                    example: '// AWS Lambda Serverless Function Handler\nexport const handler = async (event) => {\n  const { name } = JSON.parse(event.body || "{}");\n  return {\n    statusCode: 200,\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ message: Hello ${name || "Aura Student"}! })\n  };\n};',
                    output: 'Executes on-demand in milliseconds with automatic scaling to zero when idle.',
                    keyPoints: [
                        'Serverless architectures eliminate idle server maintenance costs but introduce Cold Start latency.',
                        'Edge Functions run closer to the end-user (CDN edge nodes), reducing network transit roundtrips.',
                        'Object storage (AWS S3) provides durable, infinitely scalable storage for static assets and user uploads.'
                    ],
                    mistakes: [
                        'Running long-running continuous background tasks inside serverless functions with strict execution timeouts.',
                        'Opening direct unpooled relational database connections inside high-concurrency Lambda functions.'
                    ],
                    practiceQuestions: [
                        { title: 'S3 Presigned Uploads', desc: 'Generate secure pre-signed AWS S3 upload URLs to allow client browsers to upload images directly to the cloud.' }
                    ]
                },
                {
                    name: 'Deployment Strategies: Blue/Green vs Canary',
                    definition: 'Advanced release techniques ensuring zero-downtime updates and progressive risk mitigation during production deployments.',
                    concept: '<p>Blue/Green maintains two identical environments (Blue active, Green staged with new release); traffic switches instantaneously at the load balancer. Canary rolls updates out to a small percentage (e.g., 5%) of users first to detect regressions.</p>',
                    syntax: 'Traffic Router ---> 95% v1.0 (Stable) | 5% v1.1 (Canary)',
                    example: '// Canary Traffic Weighted Routing Concept (AWS ALB / Nginx)\n// 1. Deploy v2 to Canary environment\n// 2. Route 10% traffic to Canary\n// 3. Monitor error rates, latency (p99), and APM logs\n// 4. If error rate > 0.5%, trigger automated rollback; else shift 100% traffic.',
                    output: 'Mitigates production outages by validating new application versions against live user traffic safely.',
                    keyPoints: [
                        'Blue/Green offers instantaneous rollback by pointing the router back to the idle Blue environment.',
                        'Canary deployments minimize the blast radius of undetected software bugs.',
                        'Rolling deployments update instances incrementally, requiring zero duplicate infrastructure.'
                    ],
                    mistakes: [
                        'Executing non-backward-compatible database schema changes during Blue/Green or Canary rollouts (breaking concurrent v1/v2 instances).',
                        'Rolling back deployments without handling in-flight active user sessions.'
                    ],
                    practiceQuestions: [
                        { title: 'Canary Metrics Audit', desc: 'Define three automated monitoring metrics (error rate, p99 latency, CPU) that trigger an automatic Canary rollback.' }
                    ]
                },
                {
                    name: 'Monitoring, Observability & APM',
                    definition: 'The discipline of tracking system health and debugging failures using the Three Pillars of Observability: Metrics, Logs, and Traces.',
                    concept: '<p>Metrics track numeric aggregations over time (Prometheus). Structured Logs record contextual event trails (JSON to Winston/Elasticsearch). Distributed Traces track single request journeys across microservices (OpenTelemetry, Jaeger).</p>',
                    syntax: 'import winston from "winston";\nconst logger = winston.createLogger({ level: "info" });',
                    example: '// Structured JSON Logging with Trace Correlation\nimport winston from "winston";\n\nconst logger = winston.createLogger({\n  format: winston.format.json(),\n  defaultMeta: { service: "auth-service" },\n  transports: [new winston.transports.Console()]\n});\n\nlogger.error("Database connection timeout", {\n  traceId: "trc_9a82b",\n  retryCount: 3,\n  timestamp: new Date().toISOString()\n});',
                    output: '{"level":"error","message":"Database connection timeout","service":"auth-service","traceId":"trc_9a82b","retryCount":3}',
                    keyPoints: [
                        'Structured JSON logs allow automated indexing and filtering in tools like Datadog, Grafana Loki, and Elastic.',
                        'Distributed Tracing (OpenTelemetry) assigns a unique traceId across cross-service HTTP calls.',
                        'SLA/SLO/SLI: Service Level Indicators measure performance; Objectives define targets; Agreements bind business commitments.'
                    ],
                    mistakes: [
                        'Using raw console.log statements in production without log levels (info, warn, error) or timestamps.',
                        'Alert fatigue: configuring notifications for minor blips rather than actionable business SLO breaches.'
                    ],
                    practiceQuestions: [
                        { title: 'Health & Readiness Probe', desc: 'Implement /health/live and /health/ready endpoints that check database and cache availability.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 12 Comprehensive Assessment: DevOps, Containers & Cloud Architecture',
                questions: [
                    {
                        question: '1. What fundamental Linux kernel features enable Docker containers to share the host OS kernel while maintaining isolation?',
                        options: ['Namespaces and Control Groups (cgroups)', 'Virtual Machine Hypervisors', 'Direct BIOS Emulation', 'TCP Socket Filters'],
                        correct: 0,
                        explanation: 'Namespaces provide process, network, and mount isolation; cgroups allocate and limit physical hardware resources like CPU and memory.'
                    },
                    {
                        question: '2. Why are Multi-Stage Docker builds strongly recommended for production applications?',
                        options: ['They compile JavaScript into binary code', 'They decouple heavy build-time compilers and devDependencies from the final minimal production runtime image', 'They bypass Docker security checks', 'They make containers run on physical GPUs'],
                        correct: 1,
                        explanation: 'Multi-stage builds leave behind build tools, intermediate files, and devDependencies, reducing image size and attack surface.'
                    },
                    {
                        question: '3. What command should be used in CI/CD pipelines instead of npm install to ensure reproducible and deterministic builds?',
                        options: ['npm update', 'npm ci', 'npm build', 'npm cache verify'],
                        correct: 1,
                        explanation: 'npm ci strictly installs the exact versions locked in package-lock.json and deletes existing node_modules, ensuring identical builds.'
                    },
                    {
                        question: '4. In Kubernetes architecture, what is the smallest deployable computing unit that can be created and managed?',
                        options: ['Node', 'Pod', 'ReplicaSet', 'Cluster'],
                        correct: 1,
                        explanation: 'A Pod represents a single instance of a running process in a cluster, encapsulating one or more tightly coupled containers.'
                    },
                    {
                        question: '5. What is the role of a Kubernetes Readiness Probe?',
                        options: ['Reboots the physical server when CPU reaches 100%', 'Determines whether a container is ready to accept incoming network traffic before adding it to Service endpoints', 'Scans container images for malware', 'Deletes idle pods'],
                        correct: 1,
                        explanation: 'Readiness probes prevent traffic from routing to containers that are still initializing or warming caches.'
                    },
                    {
                        question: '6. In Blue/Green deployments, how is traffic redirected to the newly updated application version?',
                        options: ['By restarting all physical servers simultaneously', 'By switching the router or load balancer target immediately from the Blue environment to the Green environment', 'By slowly upgrading 1% of servers each day', 'By emailing users a new IP address'],
                        correct: 1,
                        explanation: 'Blue/Green deployment provisions an identical staging environment (Green) and performs an instantaneous routing switch for zero downtime.'
                    },
                    {
                        question: '7. What is the primary objective of a Canary deployment strategy?',
                        options: ['To eliminate the need for automated tests', 'To route a small percentage of real production traffic to a new release to observe metrics and minimize blast radius before full rollout', 'To run applications only during daytime hours', 'To encrypt database tables on the fly'],
                        correct: 1,
                        explanation: 'Canary releases expose a small fraction of users to new versions, allowing early regression detection before broad exposure.'
                    },
                    {
                        question: '8. What phenomenon causes serverless functions (like AWS Lambda) to take significantly longer on their first invocation after being idle?',
                        options: ['Cold Start latency', 'Network partitioning', 'Deadlock timeout', 'Cache stampede'],
                        correct: 0,
                        explanation: 'Cold starts happen when cloud providers spin up a fresh container instance and load runtime environments for an inactive function.'
                    },
                    {
                        question: '9. What are the Three Pillars of Observability in modern software systems?',
                        options: ['HTML, CSS, and JavaScript', 'Metrics, Logs, and Distributed Traces', 'CPU, RAM, and Disk', 'Docker, Kubernetes, and Helm'],
                        correct: 1,
                        explanation: 'Observability relies on Metrics (aggregations over time), Logs (timestamped contextual events), and Traces (end-to-end request journeys).'
                    },
                    {
                        question: '10. What does a Distributed Tracing system use to correlate operations across multiple independent microservices?',
                        options: ['A shared database lock', 'A unique Trace ID passed across HTTP/gRPC request headers', 'User passwords', 'The local server IP address'],
                        correct: 1,
                        explanation: 'Trace IDs injected into request headers allow tracing tools (like OpenTelemetry) to track an asynchronous request across multiple boundaries.'
                    },
                    {
                        question: '11. Why should running containerized processes as root (UID 0) in production be strictly avoided?',
                        options: ['Root processes consume double the RAM', 'If a container escape vulnerability occurs, the attacker gains full root privileges on the underlying host operating system', 'Linux forbids root execution in containers', 'Node.js will crash on launch'],
                        correct: 1,
                        explanation: 'Non-root users limit privileges, preventing privilege escalation to the host machine if the container sandbox is breached.'
                    },
                    {
                        question: '12. What does the Kubernetes Horizontal Pod Autoscaler (HPA) automatically adjust?',
                        options: ['The number of pod replicas in a deployment based on observed CPU or custom metrics', 'The RAM size of the physical motherboard', 'The cost of cloud subscriptions', 'The domain DNS records'],
                        correct: 0,
                        explanation: 'HPA dynamically scales the number of replica pods up or down depending on target resource thresholds.'
                    },
                    {
                        question: '13. What is the purpose of configuring a .dockerignore file in a project root?',
                        options: ['Stops Docker from installing packages', 'Prevents unneeded local files (node_modules, .env, .git) from bloating the Docker build context and leaking secrets', 'Disables container networking', 'Encrypts source code on disk'],
                        correct: 1,
                        explanation: '.dockerignore keeps large and sensitive directories out of image build layers, speeding up builds and maintaining security.'
                    },
                    {
                        question: '14. In modern Site Reliability Engineering (SRE), what does an SLI (Service Level Indicator) represent?',
                        options: ['The legal penalty paid to clients on failure', 'A direct quantitative measurement of service performance in real time (e.g., latency under 200ms or 99.9% success rate)', 'The CPU speed of the server', 'The total lines of committed code'],
                        correct: 1,
                        explanation: 'An SLI is a concrete metric measuring how well a service is performing against operational targets.'
                    },
                    {
                        question: '15. What security measure allows frontend client browsers to upload multi-gigabyte video files directly to cloud storage (AWS S3) without burdening backend application servers?',
                        options: ['Pre-signed URLs (or pre-signed POST policies)', 'Hardcoding AWS root credentials in frontend code', 'Disabling CORS checks on S3', 'Opening public write access to the S3 bucket'],
                        correct: 0,
                        explanation: 'Pre-signed URLs give temporary, cryptographically signed write permissions directly to the client, keeping large uploads off app servers.'
                    }
                ]
            }
        },
   {
            id: 'sec-capstone-projects',
            title: '13. Capstone Projects & Architecture',
            topics: [
                {
                    name: 'Enterprise Monorepo Architecture',
                    definition: 'A software development strategy where code for multiple interdependent projects, packages, and microservices is stored in a single unified Git repository.',
                    concept: '<p>Monorepo engines (Turborepo, Nx, pnpm workspaces) manage dependency graphs, caching computation outputs to eliminate redundant build and test cycles across shared libraries (UI kits, shared types, API clients).</p>',
                    syntax: '// pnpm-workspace.yaml\npackages:\n  - "apps/"\n  - "packages/"',
                    example: '// turbo.json build pipeline definition\n{\n  "$schema": "https://turbo.build/schema.json",\n  "pipeline": {\n    "build": {\n      "dependsOn": ["^build"],\n      "outputs": ["dist/*", ".next/*"]\n    },\n    "test": {\n      "dependsOn": ["build"]\n    }\n  }\n}',
                    output: 'Shared caching prevents recompiling untouched modules, cutting build times by 80%.',
                    keyPoints: [
                        'Atomic commits ensure breaking interface changes update consumers across the entire codebase simultaneously.',
                        'Shared packages (@repo/ui, @repo/database) guarantee uniform styling and unified type contracts.',
                        'Remote Caching shares build artifacts across team members and CI pipelines.'
                    ],
                    mistakes: [
                        'Creating circular dependencies between workspace packages (Package A requires B, which requires A).',
                        'Not isolating package dependencies, causing phantom dependencies to leak into workspaces.'
                    ],
                    practiceQuestions: [
                        { title: 'Turborepo Setup', desc: 'Configure a Turborepo monorepo with an Express API, a Next.js web app, and a shared TypeScript library.' }
                    ]
                },
                {
                    name: 'Real-Time Collaborative Systems (WebSockets & WebRTC)',
                    definition: 'Bi-directional, persistent communication architectures enabling instantaneous data exchange between client applications and servers or peers.',
                    concept: '<p>WebSockets establish a continuous full-duplex TCP connection via an initial HTTP Upgrade handshake. WebRTC enables direct peer-to-peer audio, video, and data channels with minimal latency, using STUN/TURN servers for NAT traversal.</p>',
                    syntax: 'const socket = new WebSocket("wss://api.auragrowth.com/ws");\nsocket.onmessage = (event) => { console.log(JSON.parse(event.data)); };',
                    example: '// Node.js WebSocket (ws) Server with Heartbeat\nimport { WebSocketServer } from "ws";\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on("connection", (ws) => {\n  ws.isAlive = true;\n  ws.on("pong", () => { ws.isAlive = true; });\n  ws.on("message", (data) => {\n    // Broadcast payload to all connected clients\n    wss.clients.forEach((client) => {\n      if (client.readyState === ws.OPEN) client.send(data);\n    });\n  });\n});',
                    output: 'Full-duplex WebSocket broadcast channel maintaining live bi-directional sync.',
                    keyPoints: [
                        'Ping/Pong heartbeat frames are essential to detect silent broken connections and reclaim socket descriptors.',
                        'Scale WebSockets horizontally using Redis Pub/Sub backplanes to sync messages across server instances.',
                        'WebRTC requires ICE candidate exchange and SDP signaling over standard WebSockets before direct P2P mesh connection.'
                    ],
                    mistakes: [
                        'Holding thousands of open WebSocket connections on a single server without optimizing OS file descriptor limits (ulimit).',
                        'Broadcasting massive raw JSON payloads on high-frequency events instead of using binary serialization (Protobuf).'
                    ],
                    practiceQuestions: [
                        { title: 'Collaborative Whiteboard', desc: 'Build a canvas collaboration room synchronizing cursor coordinates in real time using WebSocket broadcasting.' }
                    ]
                },
                {
                    name: 'SaaS Payment Integration & Webhooks (Stripe)',
                    definition: 'Payment processing architectures designed to securely handle subscriptions, invoicing, PCI-DSS compliance, and idempotent transaction webhooks.',
                    concept: '<p>Payment gateways offload credit card liability via pre-built checkout elements. The server creates PaymentIntents, while critical state transitions (renewals, chargebacks) are confirmed asynchronously via cryptographically signed Webhook listeners.</p>',
                    syntax: 'const session = await stripe.checkout.sessions.create({ ... });\n// Webhook verification: stripe.webhooks.constructEvent(rawBody, sig, secret);',
                    example: '// Express Stripe Webhook Handler\nimport Stripe from "stripe";\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\napp.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {\n  const sig = req.headers["stripe-signature"];\n  let event;\n  try {\n    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);\n  } catch (err) {\n    return res.status(400).send(Webhook Error: ${err.message});\n  }\n  if (event.type === "checkout.session.completed") {\n    const session = event.data.object;\n    // Fulfill user subscription in database\n  }\n  res.json({ received: true });\n});',
                    output: 'Cryptographically verifies webhook signature and completes user subscription securely.',
                    keyPoints: [
                        'Always verify webhook signatures using raw, unparsed request bodies to prevent tampering.',
                        'Make webhook handlers strictly idempotent: track event IDs in the database to prevent double-crediting on retries.',
                        'Never handle raw credit card numbers on your application servers (preserves SAQ-A PCI compliance).'
                    ],
                    mistakes: [
                        'Relying solely on frontend redirection URLs to activate paid user features without verifying webhooks.',
                        'Parsing the incoming webhook body as standard JSON before passing it to signature verification methods.'
                    ],
                    practiceQuestions: [
                        { title: 'Stripe Webhook Idempotency', desc: 'Implement an event queue that logs Stripe webhook event IDs to guarantee single execution.' }
                    ]
                },
                {
                    name: 'Search & Full-Text Indexing (Elasticsearch / Algolia)',
                    definition: 'Specialized document search engines built for sub-second, typo-tolerant, fuzzy full-text indexing and faceted filtering across massive corpora.',
                    concept: '<p>Search engines build an Inverted Index (mapping tokens to document IDs) using tokenization, stemming, and stop-word filtering. Queries leverage BM25 relevance scoring and vector embeddings for semantic search.</p>',
                    syntax: 'GET /courses/_search\n{ "query": { "multi_match": { "query": "fullstack", "fuzziness": "AUTO" } } }',
                    example: '// PostgreSQL Full-Text Search with tsvector & tsquery\nSELECT id, title, ts_rank(search_vector, query) AS rank\nFROM courses, to_tsvector(\'english\', title || \' \' || description) search_vector,\n     to_tsquery(\'english\', \'react & node\') query\nWHERE search_vector @@ query\nORDER BY rank DESC\nLIMIT 10;',
                    output: 'Ranked list of course documents sorted by keyword relevance density.',
                    keyPoints: [
                        'Inverted indexes map tokens to matching documents, enabling O(1) term lookups regardless of corpus scale.',
                        'PostgreSQL tsvector provides robust full-text search before introducing full Elasticsearch clusters.',
                        'Fuzziness algorithms (Levenshtein distance) accommodate spelling mistakes gracefully.'
                    ],
                    mistakes: [
                        'Using SQL LIKE or ILIKE "%term%" on tables with millions of rows, triggering catastrophic table scans.',
                        'Failing to synchronize external search index clusters when primary database records are updated or deleted.'
                    ],
                    practiceQuestions: [
                        { title: 'Fuzzy Search API', desc: 'Create a product search endpoint with 2-character typo tolerance using PostgreSQL GIN indexes or Algolia.' }
                    ]
                },
                {
                    name: 'Complex State & Distributed Caching (CQRS / Event Sourcing)',
                    definition: 'Advanced data architecture separating read models from write models (CQRS) and storing state transitions as an append-only sequence of immutable events (Event Sourcing).',
                    concept: '<p>Command Query Responsibility Segregation (CQRS) routes writes to normalized, ACID transactional stores while publishing domain events to denormalized read-optimized caches (Elasticsearch/Redis). Event Sourcing preserves full historical audit trails.</p>',
                    syntax: 'Command -> Write Model -> Event Store -> Event Bus -> Read Projections',
                    example: '// Event Sourcing Ledger Representation\nconst eventStore = [\n  { type: "ACCOUNT_OPENED", accountId: "acc_1", balance: 0, timestamp: 1600000000 },\n  { type: "FUNDS_DEPOSITED", accountId: "acc_1", amount: 500, timestamp: 1600000050 },\n  { type: "FUNDS_WITHDRAWN", accountId: "acc_1", amount: 200, timestamp: 1600000100 }\n];\n\n// Reconstitute state\nconst currentBalance = eventStore.reduce((balance, event) => {\n  if (event.type === "FUNDS_DEPOSITED") return balance + event.amount;\n  if (event.type === "FUNDS_WITHDRAWN") return balance - event.amount;\n  return balance;\n}, 0);\nconsole.log(Current Balance: $${currentBalance});',
                    output: 'Current Balance: $300 (Reconstituted state from immutable historical event stream)',
                    keyPoints: [
                        'Event stores are strictly append-only; past events are never modified or deleted.',
                        'Snapshots are taken periodically (e.g., every 1,000 events) to accelerate state reconstruction.',
                        'Read projections can be discarded and regenerated from the event store whenever query requirements change.'
                    ],
                    mistakes: [
                        'Applying CQRS/Event Sourcing to basic CRUD applications that do not require complex auditing, introducing massive operational overhead.',
                        'Ignoring eventual consistency delays between the command write store and read projections.'
                    ],
                    practiceQuestions: [
                        { title: 'Event Store Replay', desc: 'Design an event replay function that reconstructs the shopping cart state of a user from chronological events.' }
                    ]
                },
                {
                    name: 'Enterprise Security Hardening & Zero-Trust',
                    definition: 'An end-to-end cybersecurity posture operating under the assumption that threats exist both inside and outside the perimeter: "Never trust, always verify."',
                    concept: '<p>Zero-Trust implements Role-Based Access Control (RBAC) / Attribute-Based Access Control (ABAC), Mutual TLS (mTLS) between internal microservices, automated secret rotation, rate limiting, and automated vulnerability scanning (OWASP ZAP/Snyk).</p>',
                    syntax: 'User/Service -> [mTLS / Identity Verification] -> [RBAC/ABAC Gate] -> Isolated Resource',
                    example: '// Role-Based Access Control (RBAC) Middleware Guard\nexport function requirePermission(permission) {\n  return (req, res, next) => {\n    const userPermissions = req.user?.permissions || [];\n    if (!userPermissions.includes(permission)) {\n      return res.status(403).json({ error: "Access Denied: Insufficient security permissions." });\n    }\n    next();\n  };\n}\n\n// Route protected by RBAC\napp.delete("/api/courses/:id", authenticateUser, requirePermission("courses:delete"), deleteCourseHandler);',
                    output: 'Enforces strict cryptographic and permission boundary checks on protected API actions.',
                    keyPoints: [
                        'mTLS encrypts and mutually verifies the identity of both client and server microservices using internal certificates.',
                        'Principle of Least Privilege (PoLP): services and users receive only the absolute minimum permissions required.',
                        'Regular automated secret scanning in CI/CD blocks commits containing accidental private keys or tokens.'
                    ],
                    mistakes: [
                        'Leaving internal microservice communication over plaintext HTTP assuming the internal VPC is impenetrable.',
                        'Relying on hardcoded static API keys instead of dynamic OAuth2 client credentials or STS assume-role tokens.'
                    ],
                    practiceQuestions: [
                        { title: 'RBAC Policy Matrix', desc: 'Design an ABAC middleware inspecting user department, resource classification, and time of access.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 13 Comprehensive Assessment: Enterprise Capstones & Production Architecture',
                questions: [
                    {
                        question: '1. What is the primary operational benefit of using remote caching in a monorepo tooling system like Turborepo or Nx?',
                        options: ['It backs up Git commits to external hard drives', 'It allows team members and CI pipelines to download pre-built outputs for unchanged packages instead of recompiling them', 'It eliminates the need for unit tests', 'It encrypts local source files'],
                        correct: 1,
                        explanation: 'Remote caching shares build task outputs across distributed development teams and CI machines, avoiding duplicate compilation work.'
                    },
                    {
                        question: '2. What network protocol upgrade mechanism initiates a WebSocket connection from an existing HTTP client?',
                        options: ['HTTP 301 Redirect', 'HTTP 101 Switching Protocols with an Upgrade header', 'HTTP 204 No Content', 'TLS Certificate Exchange'],
                        correct: 1,
                        explanation: 'WebSockets begin as standard HTTP GET requests carrying "Upgrade: websocket" headers, prompting the server to return status 101 Switching Protocols.'
                    },
                    {
                        question: '3. Why is it essential to implement Ping/Pong heartbeat frames on persistent WebSocket connections?',
                        options: ['To measure internet download speeds', 'To detect half-open sockets or dropped connections and free server file descriptors and memory', 'To encrypt message payloads', 'To authenticate user identities on every frame'],
                        correct: 1,
                        explanation: 'TCP connections can silently break without either end realizing; periodic heartbeats identify dead sockets and clean up system resources.'
                    },
                    {
                        question: '4. Why must payment gateway webhooks (such as Stripe) be verified using the unparsed raw request body?',
                        options: ['JSON parsers strip out credit card numbers', 'Parsing mutations (like spacing or key reordering) alter cryptographic HMAC signatures, causing verification to fail', 'Raw bodies execute faster', 'Stripe sends binary files only'],
                        correct: 1,
                        explanation: 'Cryptographic signature verification matches the byte-for-byte digest generated by the sender; re-serializing parsed JSON produces mismatched signatures.'
                    },
                    {
                        question: '5. What architecture is required to ensure that webhook retries from payment providers do not trigger duplicate order fulfillments?',
                        options: ['Multi-threading', 'Idempotent consumer processing using unique event ID tracking in the database', 'Ignoring all retried webhooks', 'Running webhooks on client browsers'],
                        correct: 1,
                        explanation: 'Payment systems use at-least-once delivery; recording event IDs in an atomic transaction ensures retried duplicate events are recognized and ignored.'
                    },
                    {
                        question: '6. What underlying data structure allows full-text search engines like Elasticsearch to achieve sub-second keyword lookups across millions of documents?',
                        options: ['B-Tree index', 'Inverted Index mapping tokens to document IDs', 'Linked List', 'Hash Ring'],
                        correct: 1,
                        explanation: 'An inverted index maps extracted words and tokens directly to lists of matching document IDs, enabling rapid keyword search queries.'
                    },
                    {
                        question: '7. What does the BM25 algorithm calculate in modern text retrieval engines?',
                        options: ['Memory heap consumption', 'Relevance ranking scores based on term frequency and inverse document frequency', 'Network packet latency', 'Database query execution plans'],
                        correct: 1,
                        explanation: 'BM25 evaluates term saturation and document length normalization to rank the relevance of matching documents against a search term.'
                    },
                    {
                        question: '8. In CQRS (Command Query Responsibility Segregation) architecture, what is the core separation of concerns?',
                        options: ['Separating HTML markup from CSS styles', 'Separating the write pipeline (Commands) that alters state from the read pipeline (Queries) that returns data', 'Running frontend and backend on different operating systems', 'Using two distinct database passwords'],
                        correct: 1,
                        explanation: 'CQRS separates write operations (modifying domain models) from read operations (querying optimized projections), allowing them to scale independently.'
                    },
                    {
                        question: '9. What fundamental rule must be followed regarding existing events stored within an Event Sourcing event store?',
                        options: ['Events should be deleted every 30 days', 'Events are strictly immutable and append-only; historical events are never modified or removed', 'Events must contain plain text passwords', 'Events can be modified via SQL UPDATE'],
                        correct: 1,
                        explanation: 'Event stores represent an immutable ledger of domain facts; errors are corrected by appending compensating events rather than rewriting history.'
                    },
                    {
                        question: '10. What optimization is applied in Event Sourcing to avoid replaying thousands of historical events to determine an entity current state?',
                        options: ['Truncating the event log', 'Periodic Snapshots caching the materialized state at a specific sequence number', 'Deleting past events', 'Disabling database transactions'],
                        correct: 1,
                        explanation: 'Snapshots record the point-in-time state of an entity, allowing reconstitution to start from the snapshot rather than the beginning of time.'
                    },
                    {
                        question: '11. What is the guiding principle of a Zero-Trust security architecture?',
                        options: ['Trust all internal network traffic inside the VPC', 'Never trust, always verify: validate identities and enforce least privilege continuously for both internal and external requests', 'Disable firewalls to improve speed', 'Require passwords for read operations only'],
                        correct: 1,
                        explanation: 'Zero-Trust operates under the assumption that threats exist within internal perimeters, requiring strict verification for every access attempt.'
                    },
                    {
                        question: '12. What security protocol ensures both client microservice and server microservice authenticate each other digital certificates before establishing encrypted communication?',
                        options: ['Basic HTTP Authentication', 'Mutual TLS (mTLS)', 'Single-Sign-On (SSO)', 'OAuth2 Authorization Code Flow'],
                        correct: 1,
                        explanation: 'mTLS mandates that both the receiving server and the requesting client present and verify trusted TLS certificates, authenticating both sides.'
                    },
                    {
                        question: '13. What is the difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?',
                        options: ['RBAC checks user assigned roles; ABAC evaluates dynamic attributes (user role, resource sensitivity, location, time) for finer authorization', 'ABAC is deprecated in enterprise systems', 'RBAC runs on the client; ABAC runs in the database', 'They are synonymous security models'],
                        correct: 0,
                        explanation: 'RBAC bases access strictly on broad roles, while ABAC allows dynamic, contextual rule evaluation across environment, resource, and user attributes.'
                    },
                    {
                        question: '14. In WebRTC architectures, what is the role of a TURN (Traversal Using Relays around NAT) server?',
                        options: ['Encodes video files for storage', 'Relays media streams between peers when direct peer-to-peer connection fails due to symmetric NAT firewalls', 'Generates user authentication tokens', 'Acts as a central database'],
                        correct: 1,
                        explanation: 'When direct P2P connections cannot traverse strict symmetric NAT firewalls via STUN, TURN servers act as media relays to maintain the call.'
                    },
                    {
                        question: '15. Why is it dangerous to scale stateful WebSocket servers horizontally across multiple instances without a Pub/Sub backplane (e.g., Redis)?',
                        options: ['WebSockets only work on a single port', 'Users connected to Instance A cannot receive messages broadcast by users connected to Instance B without a distributed messaging layer', 'Browsers forbid connecting to load balancers', 'Database connections double automatically'],
                        correct: 1,
                        explanation: 'Because client connections are held in server memory, cross-instance broadcasting requires a shared message bus (like Redis Pub/Sub) to fan out events.'
                    }
                ]
            }
        },
        {
            id: 'sec-interview-prep',
            title: '14. Technical Interview Prep',
            topics: [
                {
                    name: 'Core Algorithmic Patterns (Sliding Window & Two Pointers)',
                    definition: 'High-frequency algorithmic techniques designed to optimize brute-force nested iterations from O(N^2) down to linear O(N) runtime.',
                    concept: '<p>Two Pointers navigate ordered collections from opposite ends or varying speeds (Fast/Slow runner for cycle detection). Sliding Window maintains dynamic or fixed sub-arrays to compute running aggregates or continuous substring criteria efficiently.</p>',
                    syntax: '// Sliding window pointer movement\nlet left = 0;\nfor (let right = 0; right < arr.length; right++) {\n  // expand window, shrink left when invalid\n}',
                    example: '// Longest Substring Without Repeating Characters (O(N))\nfunction lengthOfLongestSubstring(s) {\n  const seen = new Map();\n  let maxLen = 0, left = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (seen.has(s[right]) && seen.get(s[right]) >= left) {\n      left = seen.get(s[right]) + 1;\n    }\n    seen.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\nconsole.log(lengthOfLongestSubstring("abcabcbb"));',
                    output: '3 (Substrings like "abc")',
                    keyPoints: [
                        'Sliding window is ideal for contiguous sub-array, substring, and running maximum problems.',
                        'Two Pointers (converging) requires sorted input arrays to make deterministic directional decisions.',
                        'Fast and Slow pointers (Floyd Cycle-Finding) reliably identify loops in linked lists using O(1) auxiliary space.'
                    ],
                    mistakes: [
                        'Failing to update internal tracker maps when shrinking the left boundary in sliding window implementations.',
                        'Using two converging pointers on an unsorted array without sorting first.'
                    ],
                    practiceQuestions: [
                        { title: 'Trapping Rain Water', desc: 'Implement the two-pointer trapped water volume algorithm with O(N) time and O(1) auxiliary space.' }
                    ]
                },
                {
                    name: 'Dynamic Programming & Memoization',
                    definition: 'An algorithmic optimization method breaking complex problems into overlapping subproblems with optimal substructure to avoid duplicate computation.',
                    concept: '<p>Top-Down approaches use recursion paired with a memoization cache. Bottom-Up approaches eliminate call stack overhead by iteratively filling a tabular array (DP Table) starting from base cases.</p>',
                    syntax: '// Bottom-Up DP Pattern\nconst dp = new Array(n + 1).fill(0);\ndp[0] = 1; // base case',
                    example: '// Coin Change Problem (Minimum coins to make total)\nfunction coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i - coin >= 0) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\nconsole.log(coinChange([1, 2, 5], 11));',
                    output: '3 (Two 5-coins and one 1-coin)',
                    keyPoints: [
                        'Identify DP when subproblems overlap and current optimal decisions depend directly on past subproblem results.',
                        'Space optimization can often compress 2D DP matrices into two rows or a single rolling 1D array.',
                        'Recursive memoization risks RangeError: Maximum Call Stack Size Exceeded on deep recursive inputs in V8.'
                    ],
                    mistakes: [
                        'Attempting dynamic programming on problems lacking optimal substructure.',
                        'Forgetting to initialize DP table arrays with impossible sentinels (e.g., Infinity or -1).'
                    ],
                    practiceQuestions: [
                        { title: '0/1 Knapsack', desc: 'Implement the classical 0/1 Knapsack algorithm and optimize its memory footprint to a single 1D row.' }
                    ]
                },
                {
                    name: 'Frontend System Design & State Architecture',
                    definition: 'The engineering discipline of structuring large-scale web applications for high performance, modular state ownership, offline resiliency, and accessibility.',
                    concept: '<p>Covers critical architectural concerns: Client vs Server Rendering (SSR/SSG/ISR), Normalized Client Stores, Virtualized List Rendering (infinite feeds), Asset Optimization (WebP/AVIF, lazy loading), and Web Vitals (LCP, INP, CLS).</p>',
                    syntax: '// Normalizing nested relational state\nconst state = {\n  users: { byId: { "u1": { id: "u1", name: "Anjani" } }, allIds: ["u1"] }\n};',
                    example: '// Virtualized Window Calculation Logic\nfunction computeVisibleRange(scrollTop, viewportHeight, rowHeight, totalItems) {\n  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2); // 2-item buffer\n  const endIndex = Math.min(totalItems - 1, Math.ceil((scrollTop + viewportHeight) / rowHeight) + 2);\n  return { startIndex, endIndex, offsetY: startIndex * rowHeight };\n}\nconsole.log(computeVisibleRange(500, 400, 50, 10000));',
                    output: '{ startIndex: 8, endIndex: 20, offsetY: 400 } (Renders 13 DOM nodes instead of 10,000)',
                    keyPoints: [
                        'DOM virtualization maintains flat DOM trees by rendering only currently visible elements in the viewport.',
                        'Normalized state prevents data inconsistencies when the same entity appears in multiple views.',
                        'Interaction to Next Paint (INP) measures responsiveness to user clicks and inputs.'
                    ],
                    mistakes: [
                        'Rendering thousands of raw DOM nodes simultaneously inside long feeds, triggering browser crashes.',
                        'Storing deeply nested, unnormalized API responses directly inside shared UI stores.'
                    ],
                    practiceQuestions: [
                        { title: 'Infinite Scroll Virtualizer', desc: 'Design an infinite scrolling feed component recycling DOM nodes via calculated transform offsets.' }
                    ]
                },
                {
                    name: 'Backend System Design Interviews',
                    definition: 'The process of designing large-scale, fault-tolerant, high-throughput distributed architectures during technical evaluations.',
                    concept: '<p>Follow the standard 4-step framework: 1. Scope Functional & Non-Functional Requirements &rarr; 2. Back-of-the-Envelope Capacity Estimation &rarr; 3. High-Level Architecture & API Contracts &rarr; 4. Deep Dives into Bottlenecks, Data Partitioning, and Failover.</p>',
                    syntax: 'Traffic -> CDN/LB -> API Gateways -> Microservices -> Master/Replica DBs + Redis Cache',
                    example: '// Back-of-the-envelope estimation for URL Shortener\n// Read:Write Ratio = 100:1\n// 100M writes/month = ~40 writes/second\n// Reads = 4,000 reads/second (Compute read-heavy caching strategies)\n// Storage: 100M * 500 bytes = 50GB/month => ~3TB over 5 years (single DB fits, but cache high-traffic URLs in Redis)',
                    output: 'Demonstrates capacity sizing and clear architectural justification.',
                    keyPoints: [
                        'Always clarify functional boundaries (user capabilities) and non-functional constraints (latency, availability, consistency).',
                        'Address Single Points of Failure (SPOFs) by introducing redundancy across every critical path tier.',
                        'State trade-offs explicitly (e.g., choosing eventual consistency to achieve low-latency global reads).'
                    ],
                    mistakes: [
                        'Jumping directly into picking specific technologies (Kafka, Redis) before calculating load requirements.',
                        'Remaining silent during the interview rather than communicating thought processes and evaluating trade-offs.'
                    ],
                    practiceQuestions: [
                        { title: 'Design WhatsApp / Chat Service', desc: 'Outline the data schema, connection management (WebSockets/TCP), and offline message queuing for a 1-on-1 chat app.' }
                    ]
                },
                {
                    name: 'JavaScript Polyfills & Machine Coding',
                    definition: 'Re-implementing core native browser and language primitives from scratch to demonstrate deep comprehension of JavaScript internals.',
                    concept: '<p>Interviews frequently require handcrafting custom implementations of Promise, Promise.all, Array.prototype.reduce, Function.prototype.bind, debounce/throttle, and EventEmitter.</p>',
                    syntax: 'Array.prototype.myMap = function(callback) { ... };',
                    example: '// Handcrafted Promise.all Polyfill\nfunction customPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    if (promises.length === 0) return resolve(results);\n\n    promises.forEach((p, index) => {\n      Promise.resolve(p)\n        .then((val) => {\n          results[index] = val;\n          completed++;\n          if (completed === promises.length) resolve(results);\n        })\n        .catch(reject);\n    });\n  });\n}',
                    output: 'Executes concurrent promises preserving original array order and failing immediately on first rejection.',
                    keyPoints: [
                        'Polyfills prove knowledge of edge cases, prototype chaining, and asynchronous lifecycle resolution.',
                        'Debounce delays invocation until inactivity; throttle limits invocation frequency to a fixed interval window.',
                        'customPromiseAll must track completion count rather than array length to prevent early resolution on sparse arrays.'
                    ],
                    mistakes: [
                        'Using results.push(val) in Promise.all instead of indexing results[index], destroying original input order.',
                        'Losing this binding in polyfilled higher-order functions by omitting proper .apply/.call invocations.'
                    ],
                    practiceQuestions: [
                        { title: 'Custom Deep Clone Polyfill', desc: 'Write an object deep-cloner handling circular references, dates, and nested arrays.' }
                    ]
                },
                {
                    name: 'Behavioral & Engineering Leadership (STAR Method)',
                    definition: 'Framework for answering situational, leadership, and culture-fit engineering interview questions with clear, impact-driven narratives.',
                    concept: '<p>The STAR framework organizes responses into: Situation (context and scope), Task (your specific engineering responsibility), Action (technical decisions and implementation steps), and Result (quantifiable business and performance metrics).</p>',
                    syntax: 'STAR: Situation -> Task -> Action -> Result (Quantified with % or numbers)',
                    example: '// STAR Response Blueprint:\n// Situation: Our production checkout API suffered 800ms p99 latency spikes during peak sales.\n// Task: I was tasked with diagnosing the bottleneck and bringing p99 latency under 200ms.\n// Action: Instrumented APM traces, isolated unindexed PostgreSQL joins, applied composite B-Tree indexes, and configured Redis caching for catalog lookups.\n// Result: Cut p99 latency from 800ms down to 110ms and prevented checkout abandonments, improving sales conversion by 12%.',
                    output: 'Structured, verifiable response demonstrating leadership and quantifiable business value.',
                    keyPoints: [
                        'Focus on "I" (your individual contribution and technical actions) rather than vague collective "we" assertions.',
                        'Quantify results with concrete measurements: reduced latency, cost savings, test coverage increases, or defect drops.',
                        'Frame technical failures or conflicts as collaborative learning experiences and iterative process improvements.'
                    ],
                    mistakes: [
                        'Spending 80% of time explaining the background context (Situation) and rushing through the technical Actions taken.',
                        'Omitting quantifiable metrics in the Result section.'
                    ],
                    practiceQuestions: [
                        { title: 'Conflict Resolution Story', desc: 'Draft a STAR narrative describing a scenario where you disagreed with a senior engineer on a technical design decision.' }
                    ]
                }
            ],
            quiz: {
                title: 'Week 14 Comprehensive Assessment: Algorithms, Machine Coding & Technical Interviews',
                questions: [
                    {
                        question: '1. What prerequisite condition is strictly required before applying the converging Two-Pointer pattern to search for a pair with target sum?',
                        options: ['The input array must be sorted', 'The input array must contain only positive integers', 'The elements must be stored in a Linked List', 'The array must have an even length'],
                        correct: 0,
                        explanation: 'Converging two-pointer search depends on sorted order to decide whether to increment left (increase sum) or decrement right (decrease sum).'
                    },
                    {
                        question: '2. What is the time complexity of the Floyd Cycle-Finding (Fast & Slow pointer) algorithm when detecting a loop in a Linked List?',
                        options: ['O(N^2) time and O(N) space', 'O(N) time and O(1) auxiliary space', 'O(log N) time and O(1) space', 'O(N log N) time and O(N) space'],
                        correct: 1,
                        explanation: 'Floyd\'s algorithm traverses the list linearly in O(N) time using two pointer variables without requiring extra memory tables.'
                    },
                    {
                        question: '3. What characteristic distinguishes Dynamic Programming from standard Divide and Conquer?',
                        options: ['Dynamic Programming has overlapping subproblems that are solved once and memoized; Divide and Conquer solves independent subproblems recursively', 'Divide and Conquer uses less memory', 'Dynamic Programming runs only on trees', 'Divide and Conquer does not use recursion'],
                        correct: 0,
                        explanation: 'DP solves subproblems that recur repeatedly (overlapping), storing intermediate results to avoid exponential redundant computation.'
                    },
                    {
                        question: '4. What core benefit does DOM Virtualization provide when building frontend applications with thousands of list items?',
                        options: ['It hides elements using display: none', 'It mounts only the small subset of items currently visible inside the viewport, keeping the browser DOM light and performant', 'It stores the list items in IndexedDB', 'It converts HTML elements to Canvas elements'],
                        correct: 1,
                        explanation: 'Virtualization drastically reduces memory overhead and layout recalculations by recycling and rendering only the visible items.'
                    },
                    {
                        question: '5. What Web Vital metric measures UI responsiveness to discrete user interactions (clicks, taps, and keystrokes)?',
                        options: ['Largest Contentful Paint (LCP)', 'Interaction to Next Paint (INP)', 'Cumulative Layout Shift (CLS)', 'Time to First Byte (TTFB)'],
                        correct: 1,
                        explanation: 'INP evaluates responsiveness throughout the entire user journey by measuring the latency of user interactions until visual updates are painted.'
                    },
                    {
                        question: '6. When designing a backend URL shortener system, why is Base62 encoding chosen over standard Base64 encoding?',
                        options: ['Base62 compresses data faster', 'Base62 eliminates "+" and "/" characters that have special or unsafe meanings inside standard URL paths', 'Base62 encrypts user passwords', 'Base64 is limited to 10 characters'],
                        correct: 1,
                        explanation: 'Base62 uses alphanumeric characters (a-z, A-Z, 0-9), making generated keys URL-safe without requiring URL percent-encoding.'
                    },
                    {
                        question: '7. In custom implementations of Promise.all, why should results be stored via results[index] = val rather than results.push(val)?',
                        options: ['push() is slower in V8', 'Promises resolve asynchronously out of order; indexing preserves the input array order regardless of resolution timing', 'Array indexing bypasses the microtask queue', 'push() causes stack overflow'],
                        correct: 1,
                        explanation: 'Promises finish in unpredictable durations; using array indices guarantees that resolved values align with the original input order.'
                    },
                    {
                        question: '8. What is the functional difference between Debounce and Throttle utilities?',
                        options: ['Debounce delays execution until a quiet period of inactivity; Throttle enforces a maximum execution rate of once per fixed time interval', 'Throttle cancels all future executions', 'Debounce runs on every millisecond', 'They are synonymous terms'],
                        correct: 0,
                        explanation: 'Debounce resets its timer on each event trigger (e.g., search autocomplete), while throttle guarantees periodic execution (e.g., scroll listeners).'
                    },
                    {
                        question: '9. In a behavioral interview using the STAR method, what element should follow the Task description?',
                        options: ['Salary expectations', 'Action: the specific technical decisions, implementation steps, and leadership actions you personally executed', 'Company background', 'The final project review'],
                        correct: 1,
                        explanation: 'STAR follows Situation -> Task -> Action -> Result. Action details your personal execution and engineering contributions.'
                    },
                    {
                        question: '10. What is the first recommended step when tackling a Backend System Design problem in an interview?',
                        options: ['Draw the database schema immediately', 'Clarify functional and non-functional requirements (scale, latency, consistency, availability constraints)', 'Select a message broker like Apache Kafka', 'Write the Express router code'],
                        correct: 1,
                        explanation: 'Clarifying the scope, user actions, traffic volume, and latency expectations prevents designing the wrong architecture.'
                    },
                    {
                        question: '11. What problem occurs if a recursive algorithm without tail-call optimization exceeds the maximum depth supported by the JavaScript engine?',
                        options: ['Memory leak in Redis', 'RangeError: Maximum call stack size exceeded', 'Browser window closes automatically', 'TypeError: undefined is not a function'],
                        correct: 1,
                        explanation: 'V8 allocates stack frames for every nested function invocation; exceeding available stack memory throws a call stack size exceeded error.'
                    },
                    {
                        question: '12. What does normalizing client-side application state mean in modern state architectures?',
                        options: ['Converting numbers to strings', 'Storing relational entities in flat dictionaries keyed by ID (byId and allIds) to eliminate duplicate records and sync bugs', 'Clearing cache on every route transition', 'Enforcing strict TypeScript compilation'],
                        correct: 1,
                        explanation: 'State normalization organizes complex nested objects into flat, ID-indexed tables similar to relational database designs.'
                    },
                    {
                        question: '13. What is the time complexity of looking up a key in a JavaScript Map or plain Object?',
                        options: ['O(N) linear time', 'O(1) average constant time', 'O(log N) logarithmic time', 'O(N^2) quadratic time'],
                        correct: 1,
                        explanation: 'Hash table implementations provide average O(1) constant time lookups for keys.'
                    },
                    {
                        question: '14. When designing a notification microservice that sends millions of transactional emails, what architectural pattern ensures the email provider API rate limits are not exceeded?',
                        options: ['Calling the email API synchronously in the HTTP controller', 'Buffering email jobs inside a durable Message Queue paired with rate-limited consumer workers', 'Running an infinite while loop', 'Disabling SSL certificates'],
                        correct: 1,
                        explanation: 'A message queue decouples creation from delivery, allowing worker pools to consume and dispatch emails at a rate conforming to external limits.'
                    },
                    {
                        question: '15. What is the most effective way to conclude the "Result" section of a STAR framework interview answer?',
                        options: ['By listing all team members\' names', 'By providing quantifiable impact metrics such as percentage latency reduction, cost savings, or error rate drops', 'By apologizing for bugs encountered', 'By changing the topic'],
                        correct: 1,
                        explanation: 'Quantifiable, data-backed metrics provide verifiable proof of engineering competence and business impact.'
                    }
                ]
            }
        }
    ]
};
   
