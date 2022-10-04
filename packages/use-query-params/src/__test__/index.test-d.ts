/* eslint-disable react-hooks/rules-of-hooks */
import { expectType } from 'tsd';
import { isNullable } from '../index';

expectType<boolean>(isNullable(null));
expectType<boolean>(isNullable(undefined));
