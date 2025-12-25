export {}
console.log(
    "Live now; make now always the most precious time. Now will never come again."
)

chrome.action.onClicked.addListener(async (tab) => {
    await chrome.sidePanel.open({
      windowId: tab.windowId
    })
  })




/*
todo revisit this, check out what the apollo extention does in email,
 what if we renerded something ona page always and if its clicked it toggles it, but we need the user to click it
*/
// This code listens for commands defined in the extension's manifest (like keyboard shortcuts).
// When the "cmd-dot" command is triggered (e.g., via a keyboard shortcut), it attempts to open the side panel in the current browser window.
// However, there's a bug: `tab` is not defined in this function's scope, so `tab.windowId` will cause an error.
// To fix this, we'll need to determine which window to target. 
// Since `onCommand` provides only the command string (and not a tab or window), 
// we can get the currently active tab to obtain its windowId.

// chrome.commands.onCommand.addListener(async (command) => {
//     if (command === "toggle-sidebar") {
//         // Query for the currently active tab in the current window
//         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//         if (tab && tab.windowId !== undefined) {
//             await chrome.sidePanel.open({
//                 windowId: tab.windowId
//             });
//         }
//     }
// })

