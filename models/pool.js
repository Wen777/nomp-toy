'use strict';

import * as _ from 'lodash';

module.exports = function(sequelize, DataTypes) {
  const Pool = sequelize.define('Pool', {
    endpoint: {
      type: DataTypes.STRING
    },
    port: {
      type: DataTypes.INTEGER
    },
    host: {
      type: DataTypes.STRING
    },
    coin: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  },
    {
      underscored: true,
      classMethods: {
        // associate: function(models) {
        //         // associations can be defined here
        // },
        /**
         * Object
         *  endpoint string required
         *  host string required
         *  port number required
         *  coin string required
         *  description string optional
         */
        addPool: function(data) {
          const record = {
            'endpoint': `stratum+tcp://${data.endpoint}`,
            'host': data.host,
            'port': data.port,
            'coin': data.coin,
            'description': data.description || ''
          };

          return this.create(record);
        },
        queryPools: function(where) {
          const obj = {
            where: where,
            attributes: ['endpoint', 'host', 'port', 'coin']
          };

          return this.findAll(obj)
                .then(data => _.map(data, site => site.toJSON()));
        }
      }
    });

  return Pool;
};
