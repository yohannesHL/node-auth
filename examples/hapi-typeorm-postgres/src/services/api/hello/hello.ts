export const getHello = {
  method: 'GET',
  path: '/hello',
  // config: {
  //     // auth: false,
  //     validate: {
  //         params: {
  //             user_id: joi.number().optional().default(null)
  //         },
  //         query: {
  //             count: joi.number().min(10)
  //             // username: Joi.string().alphanum().min(3).max(30).required(),
  //             // password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  //             // access_token: [Joi.string(), Joi.number()],
  //             // birthyear: Joi.number().integer().min(1900).max(2013),
  //             // email: Joi.string().email({ minDomainSegments: 2 })
  //         }
  //     }
  // },
  handler: (request: Request, h: ResponseToolkit) => {
    // request.params;
    return h.response({ message: 'Hello', params: request.params });
  }
};
