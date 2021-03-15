import {
  createServer,
  JSONAPISerializer,
  Model,
  Request,
  Response,
} from 'miragejs';
import CryptoJS from 'crypto-js';

const base64url = (source: CryptoJS.lib.WordArray): string => {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

const generateToken = (data: object): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);

  return `${encodedHeader}.${encodedData}`;
};

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    serializers: {
      application: JSONAPISerializer,
    },

    models: {
      user: Model,
    },

    routes() {
      this.namespace = 'api';

      this.post(
        '/users/register',
        (schema: any, request: Request): Response => {
          const data = JSON.parse(request.requestBody);
          const userExists = schema.users.findBy({ email: data.email });
          if (userExists) {
            return new Response(401, undefined, {
              message: 'A user with this email already exists!',
            });
          }
          const user = schema.users.create(data);
          return new Response(201, undefined, {
            user: user.attrs,
          });
        }
      );

      this.post(
        '/users/login',
        (schema: any, request: Request): Response => {
          const { email, password } = JSON.parse(request.requestBody);
          const user = schema.users.findBy({ email, password });
          if (!user) {
            return new Response(401, undefined, {
              message: 'Email or/and password are incorrect!',
            });
          }

          const token = generateToken(user);

          user.update({
            token,
          });
          return new Response(201, undefined, {
            user: user.attrs,
            token: user.attrs.token,
          });
        }
      );

      this.post(
        '/users/logout',
        (schema: any, request: Request): Response => {
          const { token } = JSON.parse(request.requestBody);
          const user = schema.users.findBy({ token });

          user.update({
            token: '',
          });

          return new Response(201, undefined, {
            message: 'User logged out successfully!',
          });
        }
      );

      this.get(
        '/users',
        (schema: any, request: Request): Response => {
          const token = request.requestHeaders.Authorization;
          const strippedToken = token.replace('Bearer ', '');
          const user = schema.users.findBy({ token: strippedToken });

          if (!user) {
            return new Response(401, undefined, {
              message: 'Could not find user!',
            });
          }

          return new Response(200, undefined, {
            user: user.attrs,
          });
        }
      );

      this.get(
        '/users/all',
        (schema: any): Response => {
          const users = schema.users.all();

          if (!users) {
            return new Response(401, undefined, {
              message: 'Could not find users!',
            });
          }

          return new Response(200, undefined, {
            users,
          });
        }
      );
    },
  });
}
