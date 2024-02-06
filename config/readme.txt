use $env:vidly_jwtPrivateKey = "mySecureKey" to set private key(environment variable) in powershell terminal
use Get-ChildItem Env: to see the environment variable that are set
The syntax to set the key only sets for current session.
To set for all future sessions too use setx vidly_jwtPrivateKey "mySecureKey"

You're welcome future munib