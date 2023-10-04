import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import * as ListRenderer from "./listrenderer.js";
import { MemberRenderer } from "./memberrenderer.js";
import { ResultRenderer } from "./resultrenderer.js";

window.addEventListener("load", initApp);

let members = [];
let results = [];

async function initApp() {
  initTabs();

  // load data-objects
  await buildMemberList()
  await buildResultList();

  // display lists
  const memberList = ListRenderer.construct(members, "table#members tbody", MemberRenderer);
  memberList.render();
  const resultList = ListRenderer.construct(results, "table#results tbody", ResultRenderer);
  resultList.render();

  // add sort eventlisteners
  document.querySelector("#sort-member-name").addEventListener("click", () => memberList.sort("name") );
  document.querySelector("#sort-member-active").addEventListener("click", () => memberList.sort("active") );
  document.querySelector("#sort-member-birthday").addEventListener("click", () => memberList.sort("birthday") );
  document.querySelector("#sort-member-age").addEventListener("click", () => memberList.sort("age") );
  document.querySelector("#sort-member-group").addEventListener("click", () => memberList.sort("group") );

  document.querySelectorAll("[data-action='sort']").forEach(sortButton => 
    sortButton.addEventListener("click", () => resultList.sort(sortButton.dataset.sortby))
  );

  // add filter eventlistener
  document.querySelector("#membersfilter").addEventListener("change", () => memberList.filter("group",
  document.querySelector("#membersfilter").value ));

}

export function getMember(memberId) {
  return members.find(member => member.id === memberId ); 
}

async function buildMemberList() {
  const originalData = await fetchMembers();
  members = originalData.map(member.construct);
}

async function buildResultList() {
  const originalData = await fetchResults();
  results = originalData.map(result.construct);
}

async function fetchMembers() {
  return await fetch("data/members.json").then(resp => resp.json());
}

async function fetchResults() {
  return await fetch("data/results.json").then(resp => resp.json());
}
