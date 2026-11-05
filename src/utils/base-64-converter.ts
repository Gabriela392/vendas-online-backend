import { LoginPayload } from '../auth/dtos/loginPayload.dto';

export const authorizantionToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const token = authorization?.replace(/^Bearer\s+/i, '');
  const authorizationSplited = token?.split('.');

  if (!authorizationSplited || authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }
  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
