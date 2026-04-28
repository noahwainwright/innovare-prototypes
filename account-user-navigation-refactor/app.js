const COPY = {
  setAsDefault: "Set as Default",
  defaultBadge: "Default",
  switchedBanner: "[Account name] is now the active account.",
  defaultSetBanner: "[Account name] is now your default account.",
  defaultAlreadySet: "[Account name] is already your default.",
  accountListError: "Couldn't load accounts. [Retry]",
  searchEmpty:
    "No accounts match '[query]'. Check spelling or try fewer characters.",
  userListError: "Couldn't load users for this account. [Retry]",
  userListEmpty: "No users in this account yet.",
  roleSaved: "Saved",
  roleSaveError: "Couldn't save role change. [Retry]",
  pendingChanges: "Unsaved changes",
  saving: "Saving...",
};

const accounts = [
  { id: 1, name: "Charter School Example", type: "School", isDefault: true },
  { id: 2, name: "Makeshift School", type: "School" },
  { id: 3, name: "test_trail", type: "District" },
  { id: 4, name: "Test Northtown", type: "School" },
  { id: 5, name: "Inno 3.0 Onboarding", type: "Other" },
  { id: 6, name: "Flatfileupload Acc", type: "School" },
  { id: 7, name: "Innovare Elementary", type: "School" },
  { id: 8, name: "Oscar QA Account", type: "School" },
  { id: 9, name: "Socorro Middle School", type: "School" },
];

const users = [
  ["hi@test.com", "MX-Charter-Account", "Owner", "774 days ago", "0", "SEND INVITE", "avatar-a", "HI"],
  ["hi1@test.com", "MX-Charter-Account", "Viewer", "784 days ago", "0", "SEND INVITE", "avatar-a", "HI"],
  ["erika+3.0@innovaresip.com", "Inno 3.0 Onboarding", "Viewer", "", "0", "SEND INVITE", "avatar-b", ""],
  ["bob+testinvite@innovaresip.com", "Charter School Example", "Admin", "767 days ago", "0", "SEND INVITE", "avatar-b", "BO"],
  ["engineering@innovaresip.com", "", "Super Admin", "", "0", "Accepted", "avatar-d", ""],
  ["enreyes8+socomiddle@gmail.com", "Socorro Middle School", "Owner", "", "0", "RESEND INVITE", "avatar-c", ""],
  ["oscarv90@gmail.com", "Oscar QA Account", "Editor", "", "0", "SEND INVITE", "avatar-d", ""],
  ["kyle+1234@innovaresip.com", "", "Viewer", "", "0", "SEND INVITE", "avatar-b", ""],
  ["mingxing+25111401@innovaresip.com", "", "Editor", "4 days ago", "0", "Accepted", "avatar-c", "MI"],
  ["mingxing+25111402@innovaresip.com", "", "Editor", "", "0", "RESEND INVITE", "avatar-d", ""],
  ["oscar+dec23@innovaresip.com", "", "Viewer", "126 days ago", "0", "SEND INVITE", "avatar-a", "OS"],
  ["danielpinto+2@innovaresip.com", "", "Viewer", "20 days ago", "0", "SEND INVITE", "avatar-b", ""],
  ["danielpinto+admin@innovaresip.com", "", "Editor", "19 days ago", "0", "Accepted", "avatar-a", "DA"],
  ["noah+viewer1@innovaresip.com", "", "Viewer", "", "0", "SEND INVITE", "avatar-c", ""],
];

const state = {
  page: document.body.dataset.page || "switch",
  switchState: "loaded",
  search: "",
  filterOpen: false,
  settingsOpen: document.body.dataset.page === "settings",
  discardOpen: false,
  selectedSection: "Account",
  betaExpanded: true,
  footerState: "nochanges",
  defaultAccountId: 1,
  activeAccountId: 1,
  selectedAccountName: "Charter School Example",
  banners: [],
  statePanelOpen: false,
};

const icons = {
  monitor:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v12H3V4Zm2 2v8h14V6H5Zm4 12h6v2H9v-2Z"/></svg>',
  grid:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
  users:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"/></svg>',
  db:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.34 4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6c0-1.66-3.58-3-8-3Zm0 2c3.73 0 6 .9 6 1s-2.27 1-6 1-6-.9-6-1 2.27-1 6-1Zm0 14c-3.73 0-6-.9-6-1v-2.03C7.47 16.62 9.61 17 12 17s4.53-.38 6-1.03V18c0 .1-2.27 1-6 1Zm0-4c-3.73 0-6-.9-6-1v-2.03C7.47 12.62 9.61 13 12 13s4.53-.38 6-1.03V14c0 .1-2.27 1-6 1Zm0-4c-3.73 0-6-.9-6-1V7.97C7.47 8.62 9.61 9 12 9s4.53-.38 6-1.03V10c0 .1-2.27 1-6 1Z"/></svg>',
  cap:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 14.2L5 13.38V17l7 4 7-4v-3.62l-7 3.82Z"/></svg>',
  gear:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m19.43 12.98.04-.98-.04-.98 2.11-1.65-2-3.46-2.49 1a7.03 7.03 0 0 0-1.69-.98L15 2h-4l-.36 2.93c-.6.23-1.17.56-1.69.98l-2.49-1-2 3.46 2.11 1.65-.04.98.04.98-2.11 1.65 2 3.46 2.49-1c.52.42 1.09.75 1.69.98L11 22h4l.36-2.93c.6-.23 1.17-.56 1.69-.98l2.49 1 2-3.46-2.11-1.65ZM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5Z"/></svg>',
  check:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.05 14.35-4.1-4.1 1.4-1.4 2.7 2.69 5.8-5.79 1.4 1.4-7.2 7.2Z"/></svg>',
  error:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/></svg>',
  person:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"/></svg>',
  close:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.3-6.29 1.41 1.41Z"/></svg>',
  search:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 3a6.5 6.5 0 0 1 5.17 10.44l4.44 4.45-1.42 1.41-4.44-4.44A6.5 6.5 0 1 1 9.5 3Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/></svg>',
  filter:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z"/></svg>',
  down:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m7 10 5 5 5-5H7Z"/></svg>',
  up:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m7 14 5-5 5 5H7Z"/></svg>',
  edit:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm17.71-10.04a1 1 0 0 0 0-1.41L18.2 3.29a1 1 0 0 0-1.41 0l-1.96 1.96L18.58 9l2.13-1.79Z"/></svg>',
  trash:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM8 4l1-1h6l1 1h4v2H4V4h4Z"/></svg>',
  transfer:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h11l-3-3 1.4-1.4L21.8 8l-5.4 5.4L15 12l3-3H7V7Zm10 10H6l3 3-1.4 1.4L2.2 16l5.4-5.4L9 12l-3 3h11v2Z"/></svg>',
  payments:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v12H3V6Zm2 3h14V8H5v1Zm0 3v4h14v-4H5Z"/></svg>',
  lock:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7c-1.1 0-2 .9-2 2v10h14V10c0-1.1-.9-2-2-2Zm-7 0V6a2 2 0 0 1 4 0v2h-4Z"/></svg>',
  timeline:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 17h4V7H4v10Zm6 0h4V3h-4v14Zm6 0h4v-7h-4v7ZM3 19h18v2H3v-2Z"/></svg>',
  lightbulb:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21h6v-1H9v1Zm3-19a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"/></svg>',
};

function render() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      ${renderSidebar()}
      ${renderWorkspace()}
    </div>
    <div class="banner-stack">${renderBanners()}</div>
    ${renderOverlayStack()}
    ${renderStateDock()}
  `;
  bindEvents();
  if (state.switchState === "loading") {
    const input = document.querySelector("#account-search");
    if (input) input.focus();
  }
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand-area">
        <div class="bulb">${icons.lightbulb}</div>
        <div class="welcome">Welcome, Noah!</div>
      </div>
      <div class="top-actions">
        <div class="icon-button" aria-hidden="true">${icons.person}</div>
        <button class="account-pill" data-action="open-switch">Innovare</button>
      </div>
    </header>
  `;
}

function renderSidebar() {
  return `
    <aside class="sidebar" aria-label="Primary">
      <div class="side-item">${icons.monitor}</div>
      <div class="side-item">${icons.grid}</div>
      <div class="side-item active">${icons.users}</div>
      <div class="side-item">${icons.db}</div>
      <div class="side-item">${icons.cap}</div>
      <div class="side-item">${icons.gear}</div>
      <button class="side-add" aria-label="Add">+</button>
    </aside>
  `;
}

function renderWorkspace() {
  return `
    <main class="workspace">
      <section class="page-card">
        <div class="page-header">
          <div class="menu-toggle">${icons.up}</div>
          <div class="page-tab">${icons.users}<span>Users</span></div>
        </div>
        <div class="page-body">
          <aside class="page-menu">
            <div class="search-users">Search Users...<span class="search-icon">${icons.search}</span></div>
            <div class="menu-row active">${icons.users}<span>All Users</span></div>
            <div class="menu-row">${icons.users}<span>Requested to Join</span></div>
            <div class="menu-row">${icons.users}<span>Invited Users</span></div>
            <div class="menu-row">${icons.users}<span>Pending Deletion</span></div>
            <button class="invite-button">Invite Members</button>
          </aside>
          <section class="content-area">
            ${renderUsersPageTable()}
          </section>
        </div>
      </section>
    </main>
  `;
}

function renderUsersPageTable() {
  const rows = users
    .map(
      (user) => `
        <tr>
          <td><span class="name-cell"><span class="avatar-sm ${user[6]}">${user[7] || icons.person}</span>${user[0]}</span></td>
          <td>${user[1]}</td>
          <td>${user[2]}</td>
          <td>${user[3]}</td>
          <td>${user[4]}</td>
          <td>${renderInvite(user[5])}</td>
          <td><span class="row-actions">${icons.transfer}${icons.edit}${icons.trash}</span></td>
        </tr>
      `,
    )
    .join("");

  return `
    <table class="user-table" aria-label="Users table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Account</th>
          <th>Role</th>
          <th>Last Active</th>
          <th>Dashboards</th>
          <th>Invitation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderInvite(value) {
  if (value === "Accepted") return '<span class="accepted">Accepted</span>';
  return `<button class="invite-state">${value}</button>`;
}

function renderOverlayStack() {
  const switchVisible = true;
  return `
    ${switchVisible ? '<div class="overlay"></div>' : ""}
    ${switchVisible ? renderSwitchModal() : ""}
    ${state.settingsOpen ? '<div class="settings-dim"></div>' : ""}
    ${state.settingsOpen ? renderSettingsModal() : ""}
    ${state.discardOpen ? renderDiscardModal() : ""}
  `;
}

function renderSwitchModal() {
  return `
    <section class="modal switch-modal" role="dialog" aria-labelledby="switch-account-title">
      <header class="modal-header">
        <h2 class="modal-title" id="switch-account-title">Switch Account</h2>
        <button class="icon-button" data-action="close-switch" aria-label="Close">${icons.close}</button>
      </header>
      <div class="switch-body">
        <div class="search-filter-row">
          <div class="search-box">
            <input id="account-search" value="${escapeHtml(state.search)}" placeholder="Search Accounts..." data-action="search" />
            <span class="search-icon">${state.search ? icons.close : icons.search}</span>
          </div>
          <button class="filter-button" data-action="toggle-filter">${icons.filter}<span>Filter</span>${icons.down}</button>
        </div>
        <div class="filter-popover ${state.filterOpen ? "open" : ""}">
          <div class="filter-section-title">Sort By</div>
          <div class="radio-row"><span class="radio-dot"></span>Recently Viewed</div>
          <div class="radio-row"><span class="radio-dot" style="--noop: 1"></span>Alphabetical</div>
          <div class="divider"></div>
          <div class="filter-section-title">Filter By</div>
          <select class="state-select"><option>State</option></select>
          <div class="filter-actions">
            <button class="link-button" data-action="clear-filter">Clear All</button>
            <button class="apply-button" data-action="toggle-filter">Apply</button>
          </div>
        </div>
        <p class="accounts-title">Accounts</p>
        ${renderAccountState()}
      </div>
    </section>
  `;
}

function renderAccountState() {
  if (state.switchState === "loading") {
    return `
      <div class="skeleton-list" aria-label="Loading accounts">
        ${Array.from({ length: 5 })
          .map(
            () => `
              <div class="skeleton-row">
                <div class="skeleton-bar"></div>
                <div class="skeleton-bar"></div>
                <div class="skeleton-bar"></div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (state.switchState === "error") {
    return `<div class="error-state">Couldn't load accounts. <button data-action="retry-accounts">[Retry]</button></div>`;
  }

  const filtered = getFilteredAccounts();

  if (!filtered.length) {
    const query = state.search || "q";
    return `<div class="empty-state">${COPY.searchEmpty.replace("[query]", escapeHtml(query))}</div>`;
  }

  return `<div class="account-list">${filtered.map(renderAccountRow).join("")}</div>`;
}

function renderAccountRow(account) {
  const isDefault = account.id === state.defaultAccountId;
  const current = account.id === state.activeAccountId;
  return `
    <div class="account-row ${current ? "current" : ""}" data-action="switch-account" data-id="${account.id}">
      <div class="account-name">${escapeHtml(account.name)}</div>
      ${
        isDefault
          ? `<button class="account-action default-action" data-action="default-already" data-id="${account.id}">${COPY.defaultBadge}</button>`
          : `<button class="account-action" data-action="set-default" data-id="${account.id}">${COPY.setAsDefault}</button>`
      }
      <button class="edit-account-button" data-action="open-settings" data-id="${account.id}" aria-label="Edit ${escapeHtml(account.name)}">${icons.edit}</button>
    </div>
  `;
}

function renderSettingsModal() {
  return `
    <section class="modal settings-modal" role="dialog" aria-labelledby="settings-title">
      <aside class="settings-sidebar">
        <div class="account-card">
          <div class="avatar-lg">CH</div>
          <div>
            <div class="account-card-title">${escapeHtml(state.selectedAccountName)}</div>
            <div class="account-card-sub">Account: School</div>
          </div>
        </div>
        <nav class="settings-nav" aria-label="Account settings">
          ${renderNavItem("Account", icons.users)}
          ${renderNavItem("Users", icons.users)}
          ${renderNavItem("Subscriptions", icons.payments)}
          ${renderNavItem("Permissions", icons.lock)}
          ${renderNavItem("Usage Limits", icons.timeline)}
          ${renderNavItem("Beta Features", icons.lightbulb, true)}
          ${state.betaExpanded ? renderNavItem("MTSS FOT Features", "", false, true) : ""}
          ${state.betaExpanded ? renderNavItem("CIWP & Goals", "", false, true) : ""}
        </nav>
      </aside>
      <section class="settings-main">
        <header class="modal-header">
          <h2 class="modal-title" id="settings-title">${getSettingsTitle()}</h2>
          <button class="icon-button" data-action="close-settings" aria-label="Close">${icons.close}</button>
        </header>
        <div class="settings-content">${renderSettingsContent()}</div>
        ${renderSettingsFooter()}
      </section>
    </section>
  `;
}

function renderNavItem(label, icon, expandable = false, child = false) {
  const active =
    state.selectedSection === label ||
    (state.selectedSection === "Beta Features" &&
      (label === "Beta Features" || label === "MTSS FOT Features" || label === "CIWP & Goals"));
  return `
    <div class="nav-item ${active ? "active" : ""} ${child ? "child" : ""}" data-action="${expandable ? "toggle-beta" : "select-section"}" data-section="${label}">
      ${icon ? `<span class="nav-icon">${icon}</span>` : ""}
      <span class="nav-label">${label}</span>
      ${expandable ? `<span class="nav-icon">${state.betaExpanded ? icons.down : icons.up}</span>` : ""}
    </div>
  `;
}

function getSettingsTitle() {
  if (state.selectedSection === "MTSS FOT Features" || state.selectedSection === "CIWP & Goals") return "Beta Features";
  return state.selectedSection;
}

function renderSettingsContent() {
  switch (state.selectedSection) {
    case "Account":
      return renderAccountSettings();
    case "Subscriptions":
      return renderSubscriptions();
    case "Permissions":
      return renderPermissions();
    case "Usage Limits":
      return renderUsageLimits();
    case "MTSS FOT Features":
      return renderBetaFeatures("MTSS FOT Features");
    case "CIWP & Goals":
      return renderBetaFeatures("CIWP & Goals");
    case "Users":
      return renderUsersPlaceholder();
    default:
      return renderAccountSettings();
  }
}

function renderAccountSettings() {
  return `
    <div class="form-stack">
      ${field("Display Name", state.selectedAccountName)}
      ${field("Account Type", "School", true)}
      ${field("Owner's Email", "owner@innovaresip.com")}
      ${field("Select Grade Level", "Elementary, Middle", true)}
      ${field("CPS Account", "Yes", true)}
    </div>
  `;
}

function field(label, value, select = false) {
  return `
    <div class="field">
      <label>${label}</label>
      <div class="${select ? "select-like" : "input-like"}"><span>${value}</span>${select ? icons.up : ""}</div>
    </div>
  `;
}

function renderSubscriptions() {
  return `
    <div class="form-stack">
      ${field("Trial Start Date", "04/28/2026")}
      ${field("Trial End Date", "07/27/2026")}
      ${field("Subscription Start Date", "08/01/2026")}
      ${field("Subscription End Date", "07/31/2027")}
    </div>
  `;
}

function renderPermissions() {
  return `
    <div class="form-stack">
      ${toggle("Enable Embedded Dashboards")}
      ${toggle("View Marketplace Dashboards")}
      ${toggle("Use Marketplace Dashboards")}
      ${toggle("View Native Dashboards")}
      ${toggle("Create Native Dashboards")}
    </div>
  `;
}

function toggle(label) {
  return `<div class="toggle-line"><span>${label}</span><span class="switch"></span></div>`;
}

function renderUsageLimits() {
  return `
    <div class="form-stack">
      ${field("Admin Seats", "5", true)}
      ${field("Non Admin Seats", "Unlimited", true)}
      ${field("Native Dashboards", "30", true)}
      ${field("Integrations", "15", true)}
      ${field("AI Student Interventions", "3", true)}
    </div>
  `;
}

function renderBetaFeatures(title) {
  return `
    <div class="form-stack">
      <div class="placeholder-title">${title}</div>
      ${toggle("CIWP Builder")}
      ${toggle("Goal Creation")}
      ${field("Max CIWP Goals", "5", true)}
      <table class="settings-table">
        <thead><tr><th>Feature</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Progress Monitoring</td><td>Enabled</td></tr>
          <tr><td>Intervention Plans</td><td>Enabled</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderUsersPlaceholder() {
  return `
    <div class="settings-placeholder">
      <div class="pending-label">PENDING Q3</div>
      <div class="placeholder-title">Users tab coming soon. API endpoint in progress.</div>
      <div class="placeholder-copy">${COPY.userListEmpty}</div>
      <div class="route-assumption">ASSUMES ROUTE CHANGE - pending Q4</div>
    </div>
  `;
}

function renderSettingsFooter() {
  if (state.selectedSection === "Users") {
    return '<footer class="settings-footer"></footer>';
  }

  const pending = state.footerState === "pending";
  const saving = state.footerState === "saving";
  const label = pending ? COPY.pendingChanges : saving ? COPY.saving : "";
  return `
    <footer class="settings-footer">
      <button class="button-outline" data-action="cancel-settings">cancel</button>
      <div class="footer-right">
        <span class="footer-spacer">${label}</span>
        <button class="button-primary ${pending ? "" : "disabled"}" data-action="save-settings" ${pending || saving ? "" : "disabled"}>${saving ? "saving..." : "save"}</button>
      </div>
    </footer>
  `;
}

function renderDiscardModal() {
  return `
    <section class="modal discard-modal" role="dialog" aria-labelledby="discard-title">
      <button class="icon-button" data-action="cancel-discard" aria-label="Close" style="position:absolute;right:12px;top:12px">${icons.close}</button>
      <h2 class="discard-title" id="discard-title">Discard Changes?</h2>
      <p class="discard-copy">Confirm that you want to discard your changes</p>
      <div class="discard-actions">
        <button class="button-outline" data-action="cancel-discard">cancel</button>
        <button class="button-danger" data-action="discard-changes">discard</button>
      </div>
    </section>
  `;
}

function renderBanners() {
  return state.banners
    .map(
      (banner) => `
        <div class="banner ${banner.kind}" data-id="${banner.id}">
          <span class="banner-content">${banner.kind === "error" ? icons.error : icons.check}<span>${escapeHtml(banner.text)}</span></span>
          <button class="icon-button" data-action="dismiss-banner" data-id="${banner.id}" aria-label="Dismiss">${icons.close}</button>
        </div>
      `,
    )
    .join("");
}

function renderStateDock() {
  const switchStates = [
    ["loaded", "Loaded"],
    ["loading", "Loading"],
    ["search", "Search results"],
    ["empty", "Search empty"],
    ["error", "Error"],
  ];
  const footerStates = [
    ["nochanges", "No changes"],
    ["pending", "Pending"],
    ["saving", "Saving"],
    ["saved", "Saved"],
  ];
  return `
    <div class="state-dock">
      <button class="state-toggle" data-action="toggle-state-panel">States</button>
      <div class="state-panel ${state.statePanelOpen ? "open" : ""}">
        <div class="state-panel-title">Switch Account</div>
        <div class="state-grid">
          ${switchStates.map(([id, label]) => `<button class="state-chip ${state.switchState === id ? "active" : ""}" data-action="switch-state" data-state="${id}">${label}</button>`).join("")}
        </div>
        <div class="state-panel-title" style="margin-top:10px">Account Settings</div>
        <div class="state-grid">
          <button class="state-chip" data-action="open-settings">Open settings</button>
          <button class="state-chip" data-action="select-section" data-section="Users">Users tab</button>
          ${footerStates.map(([id, label]) => `<button class="state-chip ${state.footerState === id ? "active" : ""}" data-action="footer-state" data-state="${id}">${label}</button>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", handleAction);
  });
  const search = document.querySelector('[data-action="search"]');
  if (search) {
    search.addEventListener("input", (event) => {
      state.search = event.target.value;
      state.switchState = event.target.value.length ? "search" : "loaded";
      render();
    });
  }
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = Number(event.currentTarget.dataset.id);
  const section = event.currentTarget.dataset.section;
  const nextState = event.currentTarget.dataset.state;

  if (action === "set-default" || action === "default-already" || action === "open-settings") {
    event.stopPropagation();
  }

  switch (action) {
    case "open-switch":
      state.settingsOpen = false;
      state.switchState = "loaded";
      break;
    case "close-switch":
      addBanner("Switch Account remains available from the account pill.", "success");
      break;
    case "toggle-filter":
      state.filterOpen = !state.filterOpen;
      break;
    case "clear-filter":
      state.filterOpen = false;
      state.search = "";
      state.switchState = "loaded";
      break;
    case "retry-accounts":
      state.switchState = "loaded";
      addBanner("Accounts loaded.", "success");
      break;
    case "switch-account": {
      const account = accounts.find((item) => item.id === id);
      if (account) {
        state.activeAccountId = account.id;
        state.selectedAccountName = account.name;
        addBanner(COPY.switchedBanner.replace("[Account name]", account.name), "success");
      }
      break;
    }
    case "set-default": {
      const account = accounts.find((item) => item.id === id);
      if (account) {
        state.defaultAccountId = account.id;
        addBanner(COPY.defaultSetBanner.replace("[Account name]", account.name), "success");
      }
      break;
    }
    case "default-already": {
      const account = accounts.find((item) => item.id === id);
      if (account) {
        addBanner(COPY.defaultAlreadySet.replace("[Account name]", account.name), "success");
      }
      break;
    }
    case "open-settings": {
      const account = accounts.find((item) => item.id === id);
      if (account) state.selectedAccountName = account.name;
      state.settingsOpen = true;
      state.selectedSection = "Account";
      state.betaExpanded = true;
      break;
    }
    case "select-section":
      state.selectedSection = section;
      break;
    case "toggle-beta":
      state.betaExpanded = !state.betaExpanded;
      state.selectedSection = "Beta Features";
      break;
    case "close-settings":
      if (state.footerState === "pending") {
        state.discardOpen = true;
      } else {
        state.settingsOpen = false;
      }
      break;
    case "cancel-settings":
      if (state.footerState === "pending") state.discardOpen = true;
      else state.settingsOpen = false;
      break;
    case "save-settings":
      if (state.footerState === "pending") {
        state.footerState = "saving";
        render();
        window.setTimeout(() => {
          state.footerState = "saved";
          addBanner("Account Updated", "success");
          render();
          window.setTimeout(() => {
            state.footerState = "nochanges";
            render();
          }, 900);
        }, 900);
        return;
      }
      break;
    case "cancel-discard":
      state.discardOpen = false;
      break;
    case "discard-changes":
      state.discardOpen = false;
      state.footerState = "nochanges";
      state.settingsOpen = false;
      break;
    case "dismiss-banner":
      state.banners = state.banners.filter((banner) => banner.id !== event.currentTarget.dataset.id);
      break;
    case "toggle-state-panel":
      state.statePanelOpen = !state.statePanelOpen;
      break;
    case "switch-state":
      state.switchState = nextState;
      if (nextState === "empty") state.search = "zzzz";
      if (nextState === "search") state.search = "charter";
      if (nextState === "loaded" || nextState === "loading" || nextState === "error") state.search = "";
      break;
    case "footer-state":
      state.footerState = nextState;
      if (nextState === "saved") {
        addBanner("Account Updated", "success");
        state.footerState = "nochanges";
      } else {
        state.settingsOpen = true;
        state.selectedSection = state.selectedSection === "Users" ? "Account" : state.selectedSection;
      }
      break;
    default:
      break;
  }
  render();
}

function getFilteredAccounts() {
  if (state.switchState === "empty") return [];
  const query = state.search.trim().toLowerCase();
  if (!query) return accounts;
  return accounts.filter((account) => account.name.toLowerCase().includes(query));
}

function addBanner(text, kind = "success") {
  state.banners = [
    ...state.banners,
    {
      id: String(Date.now() + Math.random()),
      text,
      kind,
    },
  ].slice(-3);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

render();
