/*
 * [========================================]
 * [                 .'.                    ]
 * [                .oO;.                   ]
 * [                 ,KX0l                  ]
 * [                 'OMMK,                 ]
 * [                 :XMMX;                 ]
 * [                ,0MMMO':c               ]
 * [               :KMMWXl'OK;              ]
 * [             'xNMMWx,,dWMd              ]
 * [           .lKMMMWx;;xWMMO.             ]
 * [          ;OWMMMXl:OWWMMMx. ;o.         ]
 * [        .oNMMMW0:cKMMMMMK;  :N0,        ]
 * [       .dWMMMWx,oNMMMMMK;   cWM0'       ]
 * [       ,KMMMWx'dWMMMMM0,   .kMMN:       ]
 * [       'OMMM0'cNMMMMMX;   .xWMMN:       ]
 * [        cNMMd.dMMMMMMXl.'c0WMMMO.       ]
 * [         lXMx.oMMMMMMMWXNWMMMMX:        ]
 * [          ;0K;'0MMMMMMMMMMMMMXc         ]
 * [           .ll.'xXMMMMMMMMMNx,          ]
 * [             ..  .:dxkOOkdc'            ]
 * [             Wynntils Athena            ]
 * [                  v2.0.0                ]
 * [========================================]
 */

const request                 = require('request')
const yggdrasil               = require('yggdrasil')
const constants               = require('constants')
const crypto                  = require('crypto')


const loggerAthena = LoggerUtil('%c[Athena]', 'color: #ff0000; font-weight: bold')

let authToken = null;

// exports.getAuthToken = () => {return authToken}
exports.dashUUID = (i) => { return (i.substr(8,1) == '-') ? i : i.substr(0,8)+"-"+i.substr(8,4)+"-"+i.substr(12,4)+"-"+i.substr(16,4)+"-"+i.substr(20); }

exports.getInfo = async (uuid) => {
    return new Promise(resolve => {
        request.post('https://athena.wynntils.com/user/getInfo', {
            json: {
                uuid: exports.dashUUID(uuid)
            }
        }, function(error, response, body){
            resolve(body)
        });
    })
}

exports.validated = () => {
    if(authToken !== null){
        return true
    }else{
        return false
    }
}

exports.login = () => {
    if(authToken !== null) return
    printCoolLogo()
    const yggdrasilServer = yggdrasil.server()
    return new Promise(resolve => {
        request({
            url: 'https://athena.wynntils.com/auth/getPublicKey',
            json: true
        }, function(error, response, body){
            resolve(body.publicKeyIn);
        })
    }).then(athenaPub => {

        var sharedSecret = crypto.randomBytes(16);
        var publicKeyBy = Buffer.from(athenaPub, "hex");

        var publicKey = crypto.createPublicKey({key: publicKeyBy, format: "der", "type": "spki"})
        var encryptedSharedSecret = crypto.publicEncrypt({"key":publicKey, "padding":constants.RSA_PKCS1_PADDING}, sharedSecret)
        var athenaKey = (encryptedSharedSecret.toString("hex"));

        joinServerRequest(onJoinServerResponse)

        function onJoinServerResponse (err) {
            if (err) {
                loggerLanding.error(err);
            } else {
                sendEncryptionKeyResponse()
            }
        }

        function joinServerRequest (cb) {
            yggdrasilServer.join(ConfigManager.getSelectedAccount().accessToken, ConfigManager.getSelectedAccount().uuid,
                "", sharedSecret, publicKeyBy, cb)
        }

        function sendEncryptionKeyResponse(){
            loggerAthena.log("Logging in");
            request.post('https://athena.wynntils.com/auth/responseEncryption', {
                json: {
                    username: ConfigManager.getSelectedAccount().displayName, 
                    key: athenaKey,
                    version: "launcher"
                }
            }, function(error, response, body){
                loggerAthena.log("Logged in!");
                authToken = body.authToken
            });
        }

    })
}




function printCoolLogo(){
    console.log(`%c[========================================]
[                 .'.                    ]
[                .oO;.                   ]
[                 ,KX0l                  ]
[                 'OMMK,                 ]
[                 :XMMX;                 ]
[                ,0MMMO':c               ]
[               :KMMWXl'OK;              ]
[             'xNMMWx,,dWMd              ]
[           .lKMMMWx;;xWMMO.             ]
[          ;OWMMMXl:OWWMMMx. ;o.         ]
[        .oNMMMW0:cKMMMMMK;  :N0,        ]
[       .dWMMMWx,oNMMMMMK;   cWM0'       ]
[       ,KMMMWx'dWMMMMM0,   .kMMN:       ]
[       'OMMM0'cNMMMMMX;   .xWMMN:       ]
[        cNMMd.dMMMMMMXl.'c0WMMMO.       ]
[         lXMx.oMMMMMMMWXNWMMMMX:        ]
[          ;0K;'0MMMMMMMMMMMMMXc         ]
[           .ll.'xXMMMMMMMMMNx,          ]
[             ..  .:dxkOOkdc'            ]
%c[             Wynntils Athena            ]
[                  v2.0.0                ]
[========================================]`, 'color: #ff0000; font-weight: bold', 'color: yellow; font-weight: bold')
}