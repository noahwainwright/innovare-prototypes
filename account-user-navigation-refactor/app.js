const COPY = {
  setAsDefault: "Set as Default",
  defaultBadge: "Default",
  switchedBanner: "[Account name] is now the active account.",
  defaultSetBanner: "[Account name] is now your default account.",
  defaultAlreadySet: "[Account name] is already your default.",
  accountListError: "Couldn't load accounts. [Retry]",
  searchEmpty: "No accounts match '[query]'.",
  userListError: "Couldn't load users for this account. [Retry]",
  userListEmpty: "No users in this account yet.",
  roleSaved: "Saved",
  roleSaveError: "Couldn't save role change. [Retry]",
  pendingChanges: "Unsaved changes",
  saving: "Saving...",
};

const accountNames = [
  ["Charter School Example", "IL"],
  ["Makeshift School", "IN"],
  ["Chicago Public Schools", "IL"],
  ["Lincoln Elementary", "IL"],
  ["Washington High", "MI"],
  ["Jefferson Middle", "WI"],
  ["Springfield USD 186", "IL"],
  ["Aurora West School District 129", "IL"],
  ["Inno 3.0 Onboarding", "OH"],
  ["Flatfileupload Acc", "KY"],
  ["Innovare Elementary", "MN"],
  ["Oscar QA Account", "IL"],
  ["Socorro Middle School", "IN"],
  ["Lincoln Elementary", "OH"],
  ["Washington High", "IL"],
  ["Jefferson Middle", "MI"],
  ["Madison Metropolitan School District", "WI"],
  ["Cleveland Heights-University Heights", "OH"],
  ["Fort Wayne Community Schools", "IN"],
  ["Minneapolis Public Schools", "MN"],
  ["Louisville Jefferson County Schools", "KY"],
  ["Grand Rapids Public Schools", "MI"],
  ["Green Bay Area Public Schools", "WI"],
  ["Peoria Public Schools", "IL"],
  ["Kenosha Unified School District", "WI"],
  ["Dayton Public Schools", "OH"],
  ["South Bend Community Schools", "IN"],
  ["Bloomington Public Schools", "MN"],
  ["Lincoln Elementary", "WI"],
  ["Washington High", "KY"],
  ["Jefferson Middle", "OH"],
  ["Roosevelt Elementary", "IL"],
  ["Kennedy Middle", "IN"],
  ["Franklin High", "MI"],
  ["Hamilton Elementary", "WI"],
  ["Monroe Middle", "KY"],
  ["Adams High", "MN"],
  ["Central Elementary", "OH"],
  ["Northview School District", "MI"],
  ["Westfield Community Schools", "IN"],
  ["Oak Park District 97", "IL"],
  ["Evanston Township High", "IL"],
  ["Wauwatosa School District", "WI"],
  ["Ann Arbor Public Schools", "MI"],
  ["Cincinnati Public Schools", "OH"],
  ["Rochester Public Schools", "MN"],
  ["Lexington Public Schools", "KY"],
  ["Gary Community School Corporation", "IN"],
  ["Rockford Public Schools", "IL"],
  ["Lincoln Elementary", "MN"],
];

const accounts = accountNames.map(([name, stateCode], index) => ({
  id: `acc_01HX2K8N3R4M5P6Q7S8T${String(index + 1).padStart(2, "0")}`,
  name,
  stateCode,
  isDefault: index === 0,
  lastAccessedAt: new Date(Date.UTC(2026, 3, 27 - Math.floor(index * 60 / accountNames.length), 14 - (index % 12), 22, 10)).toISOString(),
}));

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
  switchState: "loading",
  search: "",
  debouncedSearch: "",
  searchTimer: null,
  queryRequestId: 0,
  listItems: [],
  nextCursor: null,
  listLoading: true,
  skeletonVisible: false,
  loadingMore: false,
  defaultSavingId: null,
  settingsOpen: document.body.dataset.page === "settings",
  openingAccountId: null,
  animateSettings: document.body.dataset.page === "settings",
  discardOpen: false,
  selectedSection: "Account",
  betaExpanded: true,
  footerState: "nochanges",
  userListState: "loaded",
  roleSavingUserId: null,
  roleSavedUserId: null,
  roleErrorUserId: null,
  defaultAccountId: accounts[0].id,
  activeAccountId: accounts[0].id,
  selectedAccountName: "Charter School Example",
  selectedAccountId: accounts[0].id,
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
  star:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.98 6.04 6.67.97-4.82 4.7 1.14 6.64L12 17.22l-5.97 3.13 1.14-6.64-4.82-4.7 6.67-.97L12 2Z"/></svg>',
  down:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m7 10 5 5 5-5H7Z"/></svg>',
  up:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="m7 14 5-5 5 5H7Z"/></svg>',
  edit:
    '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm17.71-10.04a1 1 0 0 0 0-1.41L18.2 3.29a1 1 0 0 0-1.41 0l-1.96 1.96L18.58 9l2.13-1.79Z"/></svg>',
  spinner:
    '<svg class="icon spinner-icon" width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.05" y="1.05" width="14.7" height="14.7" rx="7.35" stroke="var(--neutral-200)" stroke-width="2.1"/><path d="M1.05 8.4C1.05 12.4593 4.34071 15.75 8.4 15.75C12.4593 15.75 15.75 12.4593 15.75 8.4C15.75 4.34071 12.4593 1.05 8.4 1.05" stroke="var(--tertiary-500)" stroke-width="2.1"/></svg>',
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
  if (!state.settingsOpen) {
    const input = document.querySelector("#account-search");
    if (input) window.requestAnimationFrame(() => input.focus());
  }
  if (state.animateSettings) {
    window.setTimeout(() => {
      state.animateSettings = false;
    }, 220);
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
        <div class="modal-header-actions">
          <button class="add-account-button" data-action="add-account" aria-label="Add Account" title="Add Account">+</button>
          <button class="icon-button" data-action="close-switch" aria-label="Close">${icons.close}</button>
        </div>
      </header>
      <div class="switch-body">
        <div class="search-row">
          <div class="search-box">
            <input id="account-search" value="${escapeHtml(state.search)}" placeholder="Search accounts" data-action="search" autocomplete="off" />
            <span class="search-icon">${state.search ? icons.close : icons.search}</span>
          </div>
        </div>
        ${renderAccountState()}
      </div>
    </section>
  `;
}

function renderAccountState() {
  if (state.switchState === "loading" || state.skeletonVisible) {
    return `
      <div class="skeleton-list" aria-label="Loading accounts">
        ${Array.from({ length: 7 })
          .map(
            () => `
              <div class="skeleton-row">
                <div class="skeleton-avatar"></div>
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

  if (!state.listItems.length) {
    const query = state.debouncedSearch || state.search || "q";
    return `<div class="empty-state">${COPY.searchEmpty.replace("[query]", escapeHtml(query))}</div>`;
  }

  return `
    <div class="account-list">${state.listItems.map(renderAccountRow).join("")}</div>
    ${state.nextCursor ? `<div class="load-more-footer"><button class="load-more-button" data-action="load-more" aria-label="Load more">${state.loadingMore ? icons.spinner : "Load more"}</button></div>` : ""}
  `;
}

function renderAccountRow(account) {
  const isDefault = account.id === state.defaultAccountId;
  const current = account.id === state.activeAccountId;
  return `
    <div class="account-row ${current ? "current" : ""}" data-action="switch-account" data-id="${account.id}">
      <div class="account-avatar">${getInitials(account.name)}</div>
      <div class="account-copy">
        <div class="account-name">${escapeHtml(account.name)}${isDefault ? `<span class="default-star" aria-label="Default account">${icons.star}</span>` : ""}</div>
        <div class="account-state">${escapeHtml(account.stateCode)}</div>
      </div>
      ${
        isDefault
          ? `<button class="account-action default-action" data-action="default-already" data-id="${account.id}">${COPY.defaultBadge}</button>`
          : `<button class="account-action" data-action="set-default" data-id="${account.id}">${COPY.setAsDefault}</button>`
      }
      <button class="edit-account-button" data-action="open-settings" data-id="${account.id}" aria-label="Edit ${escapeHtml(account.name)}">${state.openingAccountId === account.id ? icons.spinner : icons.edit}</button>
    </div>
  `;
}

function renderSettingsModal() {
  const selectedAccount = accounts.find((account) => account.id === state.selectedAccountId);
  const accountCardSub = `Account: ${selectedAccount?.stateCode || "IL"}`;
  const accountInitials = getInitials(state.selectedAccountName);
  return `
    <section class="modal settings-modal ${state.animateSettings ? "modal-enter" : ""}" role="dialog" aria-labelledby="settings-title">
      <aside class="settings-sidebar">
        <div class="account-card">
          <div class="avatar-lg">${accountInitials}</div>
          <div>
            <div class="account-card-title">${escapeHtml(accountCardTitle)}</div>
            <div class="account-card-sub">${escapeHtml(accountCardSub)}</div>
          </div>
        </div>
        <nav class="settings-nav" aria-label="Account settings">
          ${renderNavItem("Account", icons.users)}
          ${renderNavItem("Subscriptions", icons.payments)}
          ${renderNavItem("Permissions", icons.lock)}
          ${renderNavItem("Usage Limits", icons.timeline)}
          ${renderNavItem("Beta Features", icons.lightbulb, true)}
          ${state.betaExpanded ? renderNavItem("MTSS FOT Features", "", false, true) : ""}
          ${state.betaExpanded ? renderNavItem("CIWP & Goals", "", false, true) : ""}
          ${renderNavItem("Users", icons.users)}
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
      return renderAccountUsers();
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

function renderAccountUsers() {
  if (state.userListState === "loading") {
    return `
      <div class="settings-users-shell">
        <div class="settings-user-skeleton">${Array.from({ length: 5 }).map(() => '<div class="settings-user-skeleton-row"></div>').join("")}</div>
      </div>
    `;
  }

  if (state.userListState === "error") {
    return `<div class="settings-placeholder"><div class="placeholder-title">Couldn't load users for this account. <button class="inline-retry" data-action="retry-users">[Retry]</button></div></div>`;
  }

  const accountUsers = getAccountUsers();
  if (!accountUsers.length || state.userListState === "empty") {
    return `<div class="settings-placeholder"><div class="placeholder-title">${COPY.userListEmpty}</div></div>`;
  }

  return `
    <div class="settings-users-shell">
      <table class="settings-users-table" aria-label="Account users">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Email</th><th></th></tr>
        </thead>
        <tbody>
          ${accountUsers.map((user) => `
            <tr>
              <td><span class="settings-user-name"><span class="avatar-sm ${user.avatar}">${user.initials}</span>${escapeHtml(user.name)}</span></td>
              <td>
                <select class="role-select" data-action="change-role" data-id="${user.id}">
                  ${["Super Admin", "Admin", "Editor", "Viewer"].map((role) => `<option ${user.role === role ? "selected" : ""}>${role}</option>`).join("")}
                </select>
              </td>
              <td>${escapeHtml(user.email || "—")}</td>
              <td class="role-status">
                ${state.roleSavingUserId === user.id ? COPY.saving : ""}
                ${state.roleSavedUserId === user.id ? COPY.roleSaved : ""}
                ${state.roleErrorUserId === user.id ? `${COPY.roleSaveError}` : ""}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
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
      scheduleAccountSearch();
      render();
    });
  }
  document.querySelectorAll('select[data-action="change-role"]').forEach((node) => {
    node.addEventListener("change", handleAction);
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const section = event.currentTarget.dataset.section;
  const nextState = event.currentTarget.dataset.state;

  if (action === "set-default" || action === "default-already" || action === "open-settings") {
    event.stopPropagation();
  }

  switch (action) {
    case "open-switch":
      state.settingsOpen = false;
      requestAccountPage({ reset: true, immediate: true });
      break;
    case "close-switch":
      addBanner("Switch Account remains available from the account pill.", "success");
      break;
    case "add-account":
      addBanner("Add Account flow coming soon.", "success");
      break;
    case "retry-accounts":
      requestAccountPage({ reset: true, immediate: true });
      break;
    case "load-more":
      if (state.nextCursor && !state.loadingMore) requestAccountPage({ reset: false, cursor: state.nextCursor });
      return;
    case "switch-account": {
      const account = accounts.find((item) => item.id === id);
      if (account) {
        state.activeAccountId = account.id;
        state.selectedAccountName = account.name;
        state.selectedAccountId = account.id;
        addBanner(COPY.switchedBanner.replace("[Account name]", account.name), "success");
      }
      break;
    }
    case "set-default": {
      const account = accounts.find((item) => item.id === id);
      if (account) {
        state.defaultAccountId = account.id;
        state.defaultSavingId = account.id;
        render();
        window.setTimeout(() => {
          state.defaultSavingId = null;
          addBanner(COPY.defaultSetBanner.replace("[Account name]", account.name), "success");
          render();
        }, 450);
        return;
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
      if (account) {
        state.selectedAccountName = account.name;
        state.selectedAccountId = account.id;
      }
      state.settingsOpen = false;
      state.openingAccountId = account?.id || id || 0;
      state.animateSettings = true;
      state.selectedSection = "Account";
      state.betaExpanded = true;
      render();
      window.setTimeout(() => {
        state.openingAccountId = null;
        state.settingsOpen = true;
        render();
        window.setTimeout(() => {
          state.animateSettings = false;
        }, 220);
      }, 420);
      return;
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
      }
      break;
    case "users-state":
      state.userListState = nextState;
      state.selectedSection = "Users";
      state.settingsOpen = true;
      break;
    case "retry-users":
      state.userListState = "loaded";
      break;
    case "change-role": {
      const userId = id;
      state.roleSavingUserId = userId;
      state.roleSavedUserId = null;
      state.roleErrorUserId = null;
      render();
      window.setTimeout(() => {
        state.roleSavingUserId = null;
        state.roleSavedUserId = userId;
        render();
        window.setTimeout(() => {
          state.roleSavedUserId = null;
          render();
        }, 2000);
      }, 650);
      return;
    }
    default:
      break;
  }
  render();
}

const PAGE_SIZE = 10;
const SEARCH_CAP = 25;
const SEARCH_DELAY_MS = 250;
const SKELETON_GRACE_MS = 150;
const ERROR_GRACE_MS = 400;
const SEARCH_DEBOUNCE_MS = 300;

const recentSorted = [...accounts].sort(
  (a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime(),
);

function encodeCursor(offset) {
  return btoa(JSON.stringify({ offset }));
}

function decodeCursor(cursor) {
  if (!cursor) return 0;
  try {
    return JSON.parse(atob(cursor)).offset || 0;
  } catch (err) {
    return 0;
  }
}

function fetchPage({ cursor, q }) {
  const trimmed = (q || "").trim().toLowerCase();
  const offset = decodeCursor(cursor);
  if (trimmed.length >= 2) {
    const matches = recentSorted
      .filter((account) => account.name.toLowerCase().includes(trimmed))
      .slice(0, SEARCH_CAP);
    return new Promise((resolve) => {
      window.setTimeout(() => resolve({ items: matches, nextCursor: null }), SEARCH_DELAY_MS);
    });
  }
  const slice = recentSorted.slice(offset, offset + PAGE_SIZE);
  const nextOffset = offset + slice.length;
  const nextCursor = nextOffset < recentSorted.length ? encodeCursor(nextOffset) : null;
  return Promise.resolve({ items: slice, nextCursor });
}

function requestAccountPage({ reset = false, immediate = false, cursor = null, q } = {}) {
  state.queryRequestId += 1;
  const requestId = state.queryRequestId;
  const query = typeof q === "string" ? q : state.debouncedSearch;

  if (reset) {
    state.switchState = "loading";
    state.listItems = [];
    state.nextCursor = null;
    state.skeletonVisible = immediate;
    if (!immediate) {
      window.setTimeout(() => {
        if (state.queryRequestId === requestId && state.switchState === "loading") {
          state.skeletonVisible = true;
          render();
        }
      }, SKELETON_GRACE_MS);
    }
  } else {
    state.loadingMore = true;
  }
  render();

  fetchPage({ cursor, q: query })
    .then((response) => {
      if (state.queryRequestId !== requestId) return;
      const items = reset ? response.items : [...state.listItems, ...response.items];
      state.listItems = items;
      state.nextCursor = response.nextCursor;
      state.skeletonVisible = false;
      state.loadingMore = false;
      state.switchState = items.length ? "loaded" : "empty";
      state.debouncedSearch = query;
      render();
    })
    .catch(() => {
      if (state.queryRequestId !== requestId) return;
      window.setTimeout(() => {
        if (state.queryRequestId !== requestId) return;
        state.switchState = "error";
        state.skeletonVisible = false;
        state.loadingMore = false;
        render();
      }, ERROR_GRACE_MS);
    });
}

function scheduleAccountSearch() {
  if (state.searchTimer) {
    window.clearTimeout(state.searchTimer);
    state.searchTimer = null;
  }
  const trimmed = state.search.trim();
  if (trimmed.length === 0) {
    state.debouncedSearch = "";
    requestAccountPage({ reset: true, immediate: true, q: "" });
    return;
  }
  if (trimmed.length < 2) return;
  state.searchTimer = window.setTimeout(() => {
    state.searchTimer = null;
    requestAccountPage({ reset: true, q: trimmed });
  }, SEARCH_DEBOUNCE_MS);
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

function getInitials(value) {
  const cleaned = String(value || "").trim();
  if (!cleaned) return "UK";
  return cleaned.slice(0, 2).toUpperCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

requestAccountPage({ reset: true, immediate: true });
render();
