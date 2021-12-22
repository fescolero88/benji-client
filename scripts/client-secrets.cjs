const isCredential = name => /^REACT_APP_S3_.*(?:ACCESS_KEY_ID|SECRET_ACCESS_KEY)$/.test(name);

function stripClientSecrets(config) {
  for (const plugin of config.plugins || []) {
    const environment = plugin.definitions && plugin.definitions['process.env'];
    if (!environment || typeof environment !== 'object') continue;
    for (const name of Object.keys(environment)) {
      if (isCredential(name)) delete environment[name];
    }
  }
  return config;
}

module.exports = { isCredential, stripClientSecrets };
