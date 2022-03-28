# Tej Birring's Website
Access this website/SPA at: www.tejbirring.com

* Implemented as a single-page [client-side] application (SPA) using the following frameworks: 
  * [Vue 3](https://vuejs.org/) (for reactive Javascript) 
  * [Vite](https://vitejs.dev/) (for development/tooling and "rollup").
* Uses [Notion](https://www.notion.so/) as content management system (CMS).
  * Notion data is accessed via serverless proxy functions to bypass browser-enforced CORS headers. CORS headers received from Notion API access point restrict access to data.
    * Code for serverless proxy functions can be [found here.](https://github.com/Tej-Birring/NotionRelayServerless)

## To build for deployment
```
# to build 
$ npm run build

# to deploy
firebase deploy --only hosting
```

## To run development server
```
$ npm run dev
```

---
## Things to do
- [ ] API work in background. Only use main/foreground thread for UI.
- [ ] Toast notifications — create a more efficient implementation using one global component and messaging system (perhaps injected?).
- [ ] Implement rendering of _all_ Notion block types. Currently, only most commonly used ones are implemented.
- [ ] Only view data once it has 
- [ ] A visual overlay/representation for the global reactive 'loading' variable (found in `$utils` injection).
- [ ] Only render/animate Notion content once images retrieved by a background worker thread — Notion server and/or proxy is jittery and thus affects user experience (randomly) when animated live without buffering the content.
--- 

__Note:__ This is a completely new implementation of an older website/SPA also written using Vue 3 — which can be [found here.](https://github.com/Tej-Birring/gsbirring)




