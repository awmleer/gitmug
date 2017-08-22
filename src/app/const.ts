export const CONST={
  graphqlUrl: window['cordova']?'https://api.github.com/graphql':'/api/graphql',
  rawUrl: window['cordova']?'https://raw.githubusercontent.com':'/raw',
  apiUrl: window['cordova']?'https://api.github.com':'/api',
  githubUrl: window['cordova']?'https://github.com':'/github',
  version:{
    major:0,
    minor:0,
    patch:0
  }
}
