const bundleId = process.env.IOS_BUNDLE_ID || 'dev.pixelwitch.furkin';
const packageName = process.env.ANDROID_PACKAGE_NAME || 'dev.pixelwitch.furkin';

// TODO(question): APPLE_TEAM_ID is not in the docs or the environment.
// Apple's validator needs TEAMID.bundleId in this file.
export function appleAppSiteAssociation() {
  const team = process.env.APPLE_TEAM_ID?.trim() ?? '';
  const appID = team ? `${team}.${bundleId}` : '';
  return {
    applinks: {
      apps: [],
      details: appID
        ? [
            {
              appID,
              paths: ['/invite/*', '/auth/callback'],
            },
          ]
        : [],
    },
  };
}

// TODO(question): ANDROID_SHA256_FINGERPRINTS is not in the docs or the environment.
// Google's validator needs the upload key and the Play app signing key.
export function assetLinks() {
  const fingerprints = (process.env.ANDROID_SHA256_FINGERPRINTS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: packageName,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];
}
