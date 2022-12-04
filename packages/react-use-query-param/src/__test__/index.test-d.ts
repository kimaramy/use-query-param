/* eslint-disable react-hooks/rules-of-hooks */
import { expectType } from 'tsd';
import { isNullType } from '../index';

expectType<boolean>(isNullType(null));
expectType<boolean>(isNullType(undefined));
