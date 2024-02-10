use $env:vidly_jwtPrivateKey = "mySecureKey" to set private key(environment variable) in powershell terminal
use Get-ChildItem Env: to see the environment variable that are set
The syntax to set the key only sets for current session.
To set for all future sessions too use setx vidly_jwtPrivateKey "mySecureKey"
To run index.js in a test environment, use: $env:NODE_ENV="test"; node index.js. Helpful for testing(integration testing)
To revert to previous environment, use:  Remove-Item Env:\NODE_ENV ; node index.js

You're welcome future munib