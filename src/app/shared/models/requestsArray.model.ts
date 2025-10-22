import { Requests } from './requests.model';

export class RequestsArray {
  requests: Array<Requests>;
  users: { [key: string]: UserObject } = {};

}

export class UserObject 
{
     image :string;
     active :boolean;
}
