# Privacy Policy

This extension (Pixiv Infinite Scroll) processes all data locally and does not send any data externally.
The handling of data is as follows:

## CSRF Token

- To provide bookmark and follow functions, the CSRF token is temporarily stored in memory.
- This token is only used when making requests to the pixiv API.

## User Settings

- User settings such as mute words are only stored in the browser's local storage.
- These settings are only used for the operation of the extension and are not sent externally.

## Content Filtering

- To provide the mute function, the extension monitors API requests made by pixiv.
- Content is filtered on the client side based on the mute words set by the user.

###### Last Updated: 2025/02/25
