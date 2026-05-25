import { GeneratedArchitecture } from "./aiEngine";

/**
 * Sanitize a label for use as a Mermaid node ID (no spaces, no special chars).
 */
function toNodeId(text: string): string {
    return text.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^_+|_+$/g, "") || "Node";
}

/**
 * Sanitize a label for use as a Mermaid node display label inside ["..."].
 * Escapes double-quotes only.
 */
function toLabel(text: string): string {
    return text.replace(/"/g, "'");
}

/**
 * Generate all 5 Mermaid diagram strings from AI-generated architecture data.
 */
export const generateDiagrams = (data: GeneratedArchitecture) => {
    const frontend = data.techStack?.frontend ?? [];
    const backend = data.techStack?.backend ?? [];
    const database = data.techStack?.database ?? [];
    const architecture = data.architecture ?? [];
    const dbEntities = data.database ?? [];
    const features = data.features ?? [];

    const hasAuth = features.some((f) => /auth/i.test(f));
    const hasAI = features.some((f) => /\bai\b|machine learning|ml|llm|openai|gemini/i.test(f));
    const hasPayment = features.some((f) => /pay|stripe|billing/i.test(f));
    const hasNotif = features.some((f) => /notif|email|sms|push/i.test(f));
    const hasSearch = features.some((f) => /search|elastic|algolia/i.test(f));
    const hasCaching = backend.some((b) => /redis|memcache/i.test(b));
    const hasQueue = backend.some((b) => /queue|kafka|rabbit|bull/i.test(b));

    // ─────────────────────────────────────────────────────────────
    // 1. SYSTEM ARCHITECTURE DIAGRAM
    // ─────────────────────────────────────────────────────────────
    const archLines: string[] = ["graph TD"];

    // Client tier
    archLines.push(`    Client["🖥️ Client Browser / Mobile App"]`);

    if (frontend.length > 0) {
        const feLabel = frontend.slice(0, 3).map(toLabel).join(" + ");
        archLines.push(`    FE["⚛️ Frontend\\n${feLabel}"]`);
        archLines.push(`    Client --> FE`);
    }

    // CDN / Static Assets
    archLines.push(`    CDN["🌐 CDN / Static Assets"]`);
    archLines.push(`    Client --> CDN`);

    // API Gateway
    archLines.push(`    Gateway["🔀 API Gateway / Load Balancer"]`);
    if (frontend.length > 0) {
        archLines.push(`    FE --> Gateway`);
    } else {
        archLines.push(`    Client --> Gateway`);
    }

    // Auth layer
    if (hasAuth) {
        archLines.push(`    Auth["🔐 Auth Service\\nJWT / OAuth2"]`);
        archLines.push(`    Gateway --> Auth`);
    }

    // Backend services
    if (backend.length > 0) {
        const bePrimary = backend[0];
        archLines.push(`    API["⚙️ ${toLabel(bePrimary)} API Server"]`);
        archLines.push(`    Gateway --> API`);

        if (backend.length > 1) {
            const beSec = backend.slice(1, 3).map(toLabel).join(", ");
            archLines.push(`    Workers["🔧 Workers\\n${beSec}"]`);
            archLines.push(`    API --> Workers`);
        }
    } else {
        archLines.push(`    API["⚙️ Backend API Server"]`);
        archLines.push(`    Gateway --> API`);
    }

    // Architecture flow steps (custom from AI)
    if (architecture.length > 0) {
        const extraSteps = architecture.filter(
            (s) => !/(client|frontend|api|backend|database|gateway)/i.test(s)
        );
        extraSteps.slice(0, 3).forEach((step, i) => {
            const nodeId = `Step${i}`;
            archLines.push(`    ${nodeId}["${toLabel(step)}"]`);
            archLines.push(`    API --> ${nodeId}`);
        });
    }

    // Database tier
    if (database.length > 0) {
        database.slice(0, 3).forEach((db, i) => {
            const dbId = `DB${i}`;
            archLines.push(`    ${dbId}[("🗄️ ${toLabel(db)}")]`);
            archLines.push(`    API --> ${dbId}`);
        });
    } else {
        archLines.push(`    DB[("🗄️ Primary Database")]`);
        archLines.push(`    API --> DB`);
    }

    if (hasAI) {
        archLines.push(`    AIService["🤖 AI / ML Service"]`);
        archLines.push(`    API --> AIService`);
    }

    if (hasPayment) {
        archLines.push(`    PayGateway["💳 Payment Gateway\\nStripe / Razorpay"]`);
        archLines.push(`    API --> PayGateway`);
    }

    if (hasCaching) {
        archLines.push(`    Cache[("⚡ Cache\\nRedis")]`);
        archLines.push(`    API --> Cache`);
    }

    if (hasNotif) {
        archLines.push(`    Notif["📧 Notification Service\\nEmail / SMS / Push"]`);
        archLines.push(`    API --> Notif`);
    }

    // ─────────────────────────────────────────────────────────────
    // 2. ER DIAGRAM
    // ─────────────────────────────────────────────────────────────
    const erLines: string[] = ["erDiagram"];

    // Build entities from AI database field, or sensible defaults
    const erEntities: Array<{ name: string; fields: string[] }> = [];

    if (dbEntities.length > 0) {
        dbEntities.forEach((entity) => {
            const safeName = toNodeId(entity).toUpperCase();
            const fields = ["string id PK", "timestamp created_at", "timestamp updated_at"];
            // Guess extra fields based on name
            if (/user/i.test(entity)) {
                fields.push("string name", "string email", "string password_hash");
            } else if (/order/i.test(entity)) {
                fields.push("float total_amount", "string status", "string user_id FK");
            } else if (/product/i.test(entity)) {
                fields.push("string name", "string description", "float price", "int stock");
            } else if (/post|article|blog/i.test(entity)) {
                fields.push("string title", "string content", "string author_id FK");
            } else if (/session|token/i.test(entity)) {
                fields.push("string token", "string user_id FK", "timestamp expires_at");
            } else {
                fields.push("string name", "string description");
            }
            erEntities.push({ name: safeName, fields });
        });
    } else {
        // Smart defaults based on features
        erEntities.push({
            name: "USER",
            fields: ["string id PK", "string name", "string email", "string password_hash", "string role", "timestamp created_at"],
        });
        erEntities.push({
            name: "SESSION",
            fields: ["string id PK", "string user_id FK", "string token", "timestamp expires_at", "timestamp created_at"],
        });
        if (hasPayment) {
            erEntities.push({
                name: "PAYMENT",
                fields: ["string id PK", "string user_id FK", "float amount", "string currency", "string status", "timestamp paid_at"],
            });
        }
        erEntities.push({
            name: "PROJECT",
            fields: ["string id PK", "string owner_id FK", "string title", "string description", "string status", "timestamp created_at"],
        });
        erEntities.push({
            name: "AUDIT_LOG",
            fields: ["string id PK", "string user_id FK", "string action", "string entity", "timestamp occurred_at"],
        });
    }

    erEntities.forEach(({ name, fields }) => {
        erLines.push(`    ${name} {`);
        fields.forEach((f) => erLines.push(`        ${f}`));
        erLines.push(`    }`);
    });

    // Relationships
    if (erEntities.length >= 2) {
        erLines.push(`    ${erEntities[0].name} ||--o{ ${erEntities[1].name} : "has"`);
    }
    if (erEntities.length >= 3) {
        erLines.push(`    ${erEntities[0].name} ||--o{ ${erEntities[2].name} : "owns"`);
    }
    if (erEntities.length >= 4) {
        erLines.push(`    ${erEntities[0].name} ||--o{ ${erEntities[3].name} : "creates"`);
    }
    if (erEntities.length >= 5) {
        erLines.push(`    ${erEntities[0].name} ||--o{ ${erEntities[4].name} : "triggers"`);
    }
    if (hasPayment) {
        const payName = erEntities.find((e) => e.name === "PAYMENT")?.name;
        if (payName) erLines.push(`    ${erEntities[0].name} ||--o{ ${payName} : "makes"`);
    }

    // ─────────────────────────────────────────────────────────────
    // 3. FLOWCHART (User Journey)
    // ─────────────────────────────────────────────────────────────
    const flowLines: string[] = ["flowchart TD"];

    flowLines.push(`    Start(["🚀 User Opens App"])`);
    flowLines.push(`    Start --> CheckAuth{{"Authenticated?"}}`);

    if (hasAuth) {
        flowLines.push(`    CheckAuth -->|"No"| Login["📝 Login / Register Page"]`);
        flowLines.push(`    Login --> Validate{{"Valid Credentials?"}}`);
        flowLines.push(`    Validate -->|"No"| LoginError["❌ Show Error"]`);
        flowLines.push(`    LoginError --> Login`);
        flowLines.push(`    Validate -->|"Yes"| IssueToken["🔑 Issue JWT Token"]`);
        flowLines.push(`    IssueToken --> Dashboard`);
        flowLines.push(`    CheckAuth -->|"Yes"| Dashboard["🏠 Dashboard"]`);
    } else {
        flowLines.push(`    CheckAuth -->|"No"| Login["📝 Login"]`);
        flowLines.push(`    Login --> Dashboard["🏠 Dashboard"]`);
        flowLines.push(`    CheckAuth -->|"Yes"| Dashboard`);
    }

    flowLines.push(`    Dashboard --> Action{{"User Action"}}`);
    flowLines.push(`    Action -->|"Create"| CreateFlow["✏️ Create / Submit Form"]`);
    flowLines.push(`    Action -->|"Browse"| BrowseFlow["🔍 Browse / Search"]`);

    if (hasAI) {
        flowLines.push(`    CreateFlow --> AIProcess["🤖 AI Processing"]`);
        flowLines.push(`    AIProcess --> ShowResult["📊 Show AI Result"]`);
    } else {
        flowLines.push(`    CreateFlow --> SaveDB["💾 Save to Database"]`);
        flowLines.push(`    SaveDB --> ShowResult["✅ Show Confirmation"]`);
    }

    if (hasPayment) {
        flowLines.push(`    Action -->|"Purchase"| Cart["🛒 Cart / Checkout"]`);
        flowLines.push(`    Cart --> PayGateway["💳 Payment Gateway"]`);
        flowLines.push(`    PayGateway --> PayResult{{"Payment OK?"}}`);
        flowLines.push(`    PayResult -->|"Yes"| Confirm["✅ Order Confirmed"]`);
        flowLines.push(`    PayResult -->|"No"| PayFail["❌ Payment Failed"]`);
        flowLines.push(`    PayFail --> Cart`);
    }

    flowLines.push(`    BrowseFlow --> ShowList["📋 Display Results"]`);
    flowLines.push(`    ShowResult --> Dashboard`);
    flowLines.push(`    ShowList --> Dashboard`);
    flowLines.push(`    Dashboard --> Logout["🚪 Logout"]`);
    flowLines.push(`    Logout --> Start`);

    // ─────────────────────────────────────────────────────────────
    // 4. COMPONENT DIAGRAM
    // ─────────────────────────────────────────────────────────────
    const compLines: string[] = ["graph LR"];

    // Frontend components — label each tech cleanly
    if (frontend.length > 0) {
        compLines.push(`    subgraph FrontendLayer["Frontend Layer"]`);
        frontend.slice(0, 4).forEach((tech, i) => {
            const id = `FE${i}`;
            compLines.push(`        ${id}["${toLabel(tech)}"]`);
        });
        compLines.push(`    end`);
    } else {
        compLines.push(`    subgraph FrontendLayer["Frontend Layer"]`);
        compLines.push(`        FE0["React / Next.js"]`);
        compLines.push(`    end`);
    }

    // API layer
    compLines.push(`    subgraph APILayer["API Layer"]`);
    compLines.push(`        APIGateway["API Gateway"]`);
    if (hasAuth) compLines.push(`        AuthSvc["Auth Service"]`);
    compLines.push(`        CoreAPI["Core Business Logic"]`);
    if (hasQueue) compLines.push(`        QueueWorker["Queue Worker"]`);
    compLines.push(`    end`);

    // Backend services
    if (backend.length > 0) {
        compLines.push(`    subgraph BackendLayer["Backend Services"]`);
        backend.slice(0, 4).forEach((tech, i) => {
            const id = `BE${i}`;
            compLines.push(`        ${id}["${toLabel(tech)}"]`);
        });
        if (hasAI) compLines.push(`        AISvc["AI / ML Service"]`);
        compLines.push(`    end`);
    }

    // Data layer
    compLines.push(`    subgraph DataLayer["Data Layer"]`);
    if (database.length > 0) {
        database.slice(0, 3).forEach((db, i) => {
            const id = `DB${i}`;
            compLines.push(`        ${id}[("${toLabel(db)}")]`);
        });
    } else {
        compLines.push(`        DB0[("Primary Database")]`);
    }
    if (hasCaching) compLines.push(`        Cache[("Redis Cache")]`);
    compLines.push(`    end`);

    // External services
    const hasExternals = hasPayment || hasNotif || hasSearch;
    if (hasExternals) {
        compLines.push(`    subgraph External["External Services"]`);
        if (hasPayment) compLines.push(`        ExtPay["Payment Gateway"]`);
        if (hasNotif) compLines.push(`        ExtNotif["Email / SMS / Push"]`);
        if (hasSearch) compLines.push(`        ExtSearch["Search Engine"]`);
        compLines.push(`    end`);
    }

    // Connections
    compLines.push(`    FrontendLayer --> APILayer`);
    compLines.push(`    APILayer --> BackendLayer`);
    compLines.push(`    BackendLayer --> DataLayer`);
    if (hasExternals) compLines.push(`    BackendLayer --> External`);

    // ─────────────────────────────────────────────────────────────
    // 5. SEQUENCE DIAGRAM (API Interaction)
    // ─────────────────────────────────────────────────────────────
    const seqLines: string[] = ["sequenceDiagram"];
    seqLines.push(`    actor User`);
    seqLines.push(`    participant FE as Frontend`);
    seqLines.push(`    participant GW as API Gateway`);
    if (hasAuth) seqLines.push(`    participant Auth as Auth Service`);
    seqLines.push(`    participant API as Backend API`);
    if (hasCaching) seqLines.push(`    participant Cache as Redis Cache`);
    seqLines.push(`    participant DB as Database`);
    if (hasAI) seqLines.push(`    participant AI as AI Service`);
    if (hasPayment) seqLines.push(`    participant Pay as Payment Gateway`);
    if (hasNotif) seqLines.push(`    participant Notif as Notification Service`);

    seqLines.push(`    User->>FE: Open Application`);
    seqLines.push(`    FE->>GW: GET /api/health`);
    seqLines.push(`    GW-->>FE: 200 OK`);

    if (hasAuth) {
        seqLines.push(`    Note over User,Auth: Authentication Flow`);
        seqLines.push(`    User->>FE: Submit Login Credentials`);
        seqLines.push(`    FE->>GW: POST /api/auth/login`);
        seqLines.push(`    GW->>Auth: Validate Credentials`);
        seqLines.push(`    Auth->>DB: SELECT user WHERE email=?`);
        seqLines.push(`    DB-->>Auth: User Record`);
        seqLines.push(`    Auth-->>GW: JWT Token`);
        seqLines.push(`    GW-->>FE: { token, user }`);
        seqLines.push(`    FE-->>User: Redirect to Dashboard`);
    }

    seqLines.push(`    Note over User,DB: Core Data Fetch`);
    seqLines.push(`    User->>FE: Request Data / Action`);
    seqLines.push(`    FE->>GW: GET /api/resource (Bearer Token)`);
    seqLines.push(`    GW->>API: Forward Request`);

    if (hasCaching) {
        seqLines.push(`    API->>Cache: GET cache_key`);
        seqLines.push(`    alt Cache Hit`);
        seqLines.push(`        Cache-->>API: Cached Data`);
        seqLines.push(`    else Cache Miss`);
        seqLines.push(`        API->>DB: SELECT * FROM resource`);
        seqLines.push(`        DB-->>API: Result Set`);
        seqLines.push(`        API->>Cache: SET cache_key (TTL 5min)`);
        seqLines.push(`    end`);
    } else {
        seqLines.push(`    API->>DB: SELECT * FROM resource`);
        seqLines.push(`    DB-->>API: Result Set`);
    }

    if (hasAI) {
        seqLines.push(`    Note over API,AI: AI Processing`);
        seqLines.push(`    API->>AI: POST /generate { prompt }`);
        seqLines.push(`    AI-->>API: AI Response`);
    }

    if (hasPayment) {
        seqLines.push(`    Note over API,Pay: Payment Flow`);
        seqLines.push(`    User->>FE: Initiate Payment`);
        seqLines.push(`    FE->>GW: POST /api/payment`);
        seqLines.push(`    GW->>API: Create Payment Intent`);
        seqLines.push(`    API->>Pay: POST /charge { amount, currency }`);
        seqLines.push(`    Pay-->>API: { status: success, txId }`);
        seqLines.push(`    API->>DB: UPDATE order SET paid=true`);
        seqLines.push(`    DB-->>API: OK`);
    }

    if (hasNotif) {
        seqLines.push(`    API->>Notif: Send Notification Event`);
        seqLines.push(`    Notif-->>User: Email / Push / SMS`);
    }

    seqLines.push(`    API-->>GW: JSON Response`);
    seqLines.push(`    GW-->>FE: 200 { data }`);
    seqLines.push(`    FE-->>User: Render Updated UI`);

    // ─────────────────────────────────────────────────────────────
    // 6. USE CASE DIAGRAM — Vertical UML Style
    //    Actors: Guest, Registered User, Admin, System (outside boundary)
    //    Use Cases inside system boundary, <<include>>/<<extend>> arrows
    // ─────────────────────────────────────────────────────────────
    const ucLines: string[] = ["graph TD"];

    // ── ACTORS (outside system boundary) ───────────────────────
    ucLines.push(`    Guest(["👤 Guest"])`);
    ucLines.push(`    RegUser(["🔓 Reg. User"])`);
    ucLines.push(`    Admin(["🛡️ Admin"])`);
    ucLines.push(`    System(["⚙️ System"])`);
    ucLines.push(`    ExtPay(["💳 Payment\\nGateway"])`);
    ucLines.push(`    ExtNotif(["📧 Notif.\\nService"])`);

    // ── USE CASES INSIDE SYSTEM BOUNDARY ──────────────────────
    ucLines.push(`    subgraph SB["🖥️ System Boundary — ${toLabel(data.title || 'App')}"]`);
    ucLines.push(`        direction TB`);

    // ── Guest / Public use cases ──────────────────────────────
    ucLines.push(`        subgraph PublicUC["Public Access"]`);
    ucLines.push(`            UC01(["View Public Content"])`);
    ucLines.push(`            UC02(["Browse & Search"])`);
    if (hasAuth) {
        ucLines.push(`            UC03(["Register Account"])`);
        ucLines.push(`            UC04(["Login / Authenticate"])`);
        ucLines.push(`            UC05(["Reset Password"])`);
    }
    ucLines.push(`        end`);

    // ── Registered User use cases ─────────────────────────────
    ucLines.push(`        subgraph UserUC["Registered User Actions"]`);
    ucLines.push(`            UC10(["View Dashboard"])`);
    ucLines.push(`            UC11(["Manage Profile"])`);
    ucLines.push(`            UC12(["Create / Submit Content"])`);
    ucLines.push(`            UC13(["Edit Own Content"])`);
    ucLines.push(`            UC14(["Delete Own Content"])`);
    ucLines.push(`            UC15(["Export / Download Data"])`);
    if (hasAI) {
        ucLines.push(`            UC16(["Generate AI Output"])`);
        ucLines.push(`            UC17(["View AI Result History"])`);
    }
    if (hasPayment) {
        ucLines.push(`            UC18(["Subscribe / Upgrade Plan"])`);
        ucLines.push(`            UC19(["Make Payment"])`);
        ucLines.push(`            UC20(["View Invoices & Orders"])`);
        ucLines.push(`            UC21(["Cancel Subscription"])`);
    }
    if (hasNotif) {
        ucLines.push(`            UC22(["Manage Notification Settings"])`);
    }
    if (hasSearch) {
        ucLines.push(`            UC23(["Advanced Search & Filter"])`);
    }
    ucLines.push(`            UC24(["Logout"])`);
    ucLines.push(`        end`);

    // ── Admin use cases ────────────────────────────────────────
    ucLines.push(`        subgraph AdminUC["Admin Functions"]`);
    ucLines.push(`            UC30(["Manage All Users"])`);
    ucLines.push(`            UC31(["Assign Roles & Permissions"])`);
    ucLines.push(`            UC32(["Moderate Content"])`);
    ucLines.push(`            UC33(["View System Analytics"])`);
    ucLines.push(`            UC34(["View Audit Logs"])`);
    ucLines.push(`            UC35(["System Configuration"])`);
    if (hasPayment) {
        ucLines.push(`            UC36(["Revenue & Payment Reports"])`);
    }
    ucLines.push(`        end`);

    // ── System / Automated use cases ──────────────────────────
    ucLines.push(`        subgraph SysUC["Automated / System Processes"]`);
    if (hasAuth) ucLines.push(`            UC40(["Refresh JWT Token"])`);
    ucLines.push(`            UC41(["Scheduled DB Backup"])`);
    ucLines.push(`            UC42(["Rate Limiting & Throttling"])`);
    if (hasAI) ucLines.push(`            UC43(["Run AI Processing Pipeline"])`);
    if (hasCaching) ucLines.push(`            UC44(["Cache Invalidation"])`);
    if (hasNotif) ucLines.push(`            UC45(["Dispatch Email / Push Jobs"])`);
    if (hasPayment) ucLines.push(`            UC46(["Process Payment Webhooks"])`);
    ucLines.push(`        end`);

    ucLines.push(`    end`);

    // ── Actor → Use Case connections ──────────────────────────
    ucLines.push(`    Guest --> UC01`);
    ucLines.push(`    Guest --> UC02`);
    if (hasAuth) {
        ucLines.push(`    Guest --> UC03`);
        ucLines.push(`    Guest --> UC04`);
        ucLines.push(`    Guest --> UC05`);
    }

    ucLines.push(`    RegUser --> UC10`);
    ucLines.push(`    RegUser --> UC11`);
    ucLines.push(`    RegUser --> UC12`);
    ucLines.push(`    RegUser --> UC13`);
    ucLines.push(`    RegUser --> UC14`);
    ucLines.push(`    RegUser --> UC15`);
    ucLines.push(`    RegUser --> UC24`);
    if (hasAI) { ucLines.push(`    RegUser --> UC16`); ucLines.push(`    RegUser --> UC17`); }
    if (hasPayment) { ucLines.push(`    RegUser --> UC18`); ucLines.push(`    RegUser --> UC19`); ucLines.push(`    RegUser --> UC20`); ucLines.push(`    RegUser --> UC21`); }
    if (hasNotif) ucLines.push(`    RegUser --> UC22`);
    if (hasSearch) ucLines.push(`    RegUser --> UC23`);

    ucLines.push(`    Admin --> UC30`);
    ucLines.push(`    Admin --> UC31`);
    ucLines.push(`    Admin --> UC32`);
    ucLines.push(`    Admin --> UC33`);
    ucLines.push(`    Admin --> UC34`);
    ucLines.push(`    Admin --> UC35`);
    if (hasPayment) ucLines.push(`    Admin --> UC36`);
    ucLines.push(`    Admin --> UC10`);

    if (hasAuth) ucLines.push(`    System --> UC40`);
    ucLines.push(`    System --> UC41`);
    ucLines.push(`    System --> UC42`);
    if (hasAI) ucLines.push(`    System --> UC43`);
    if (hasCaching) ucLines.push(`    System --> UC44`);
    if (hasNotif) ucLines.push(`    System --> UC45`);
    if (hasPayment) ucLines.push(`    System --> UC46`);

    // External actor connections
    if (hasPayment) {
        ucLines.push(`    ExtPay --> UC46`);
        ucLines.push(`    UC19 --> ExtPay`);
    }
    if (hasNotif) {
        ucLines.push(`    UC45 --> ExtNotif`);
    }

    // ── <<include>> and <<extend>> arrows ─────────────────────
    if (hasAuth) {
        ucLines.push(`    UC10 -. "<<extends>>" .-> UC04`);
        ucLines.push(`    UC40 -. "<<includes>>" .-> UC04`);
        ucLines.push(`    UC03 -. "<<includes>>" .-> UC04`);
    }
    if (hasAI) {
        ucLines.push(`    UC16 -. "<<includes>>" .-> UC43`);
        ucLines.push(`    UC17 -. "<<extends>>" .-> UC16`);
    }
    if (hasPayment) {
        ucLines.push(`    UC18 -. "<<includes>>" .-> UC19`);
        ucLines.push(`    UC19 -. "<<includes>>" .-> UC46`);
    }
    if (hasNotif) {
        ucLines.push(`    UC22 -. "<<extends>>" .-> UC45`);
    }
    ucLines.push(`    UC12 -. "<<includes>>" .-> UC13`);
    ucLines.push(`    UC13 -. "<<extends>>" .-> UC14`);

    return {
        architecture: archLines.join("\n"),
        er: erLines.join("\n"),
        flow: flowLines.join("\n"),
        component: compLines.join("\n"),
        sequence: seqLines.join("\n"),
        usecase: ucLines.join("\n"),
    };
};
