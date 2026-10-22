import {describe,expect,test,vi,afterEach} from 'vitest';
import {normalizeCalls,makeDemoCalls,phone,duration,request} from '../src/lib/calls';
afterEach(()=>{vi.unstubAllGlobals();vi.useRealTimers()});
describe('call data',()=>{
 test('normalizes numeric participants, removes duplicates and invalid dates',()=>{const calls=normalizeCalls([{id:'one',created_at:'2026-10-22T10:00:00Z',from:14165550123,to:null,duration:-3,call_type:'other'},{id:'one',created_at:'2026-10-22'},{id:'two',created_at:'invalid'},null]);expect(calls).toHaveLength(1);expect(calls[0]).toMatchObject({from:'14165550123',to:'Unknown',duration:0,call_type:'unknown',is_archived:false})});
 test('rejects invalid response envelopes',()=>{expect(()=>normalizeCalls({error:'offline'})).toThrow('invalid call list')});
 test('demo includes active, archived and all outcomes',()=>{const calls=makeDemoCalls(new Date('2026-10-22T20:00:00Z'));expect(calls).toHaveLength(32);expect(new Set(calls.map(c=>c.id)).size).toBe(32);expect(calls.filter(c=>c.is_archived)).toHaveLength(5);expect(new Set(calls.map(c=>c.call_type)).size).toBe(3);expect(calls.every(c=>c.from!==c.to)).toBe(true)});
 test('formats zero duration and valid / unknown phone numbers',()=>{expect(duration(0)).toBe('0:00');expect(duration(3671)).toBe('61:11');expect(phone('14165550123')).toBe('+1 (416) 555-0123');expect(phone('Unknown')).toBe('Unknown')});
 test('returns meaningful HTTP failures',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:503}));await expect(request('/activities')).rejects.toThrow('503')});
 test('clears a stalled request after ten seconds',async()=>{vi.useFakeTimers();vi.stubGlobal('fetch',vi.fn((_url,init)=>new Promise((_,reject)=>{init.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')))})));const pending=expect(request('/activities')).rejects.toThrow('too long');await vi.advanceTimersByTimeAsync(10000);await pending});
});
