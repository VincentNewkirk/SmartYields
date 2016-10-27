module.exports = {
  servers: {
    one: {
      host: 'staging.smartyields.com',
      username: 'newkirk',
      pem: '/Users/Vince/.ssh/digital_ocean_rsa_newkirk',
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'SmartYields',
    path: '../SmartYields',
    servers: {
      one: {}
    },
    docker: {
      image: 'abernix/meteord:base'
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://staging.smartyields.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    ssl: {
      crt: './bundle.crt', // this is a bundle of certificates
      key: './private.key', // this is the private key of the certificate
      port: 443 // 443 is the default value and it's the standard HTTPS port
    },


    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};