import { Session, SessionData } from 'express-session';
import { User } from '../types/user';

export default interface CustomSession extends Session {
  currentUser?: User; 
}