export type Call={id:string;created_at:string;direction:'inbound'|'outbound';from:string;to:string;via:string;duration:number;is_archived:boolean;call_type:'missed'|'answered'|'voicemail'|'unknown';name?:string;company?:string};
export type Source='demo'|'api';
