const ALLOWED_SERVICES = new Set(['General enquiry','Discovery call','UX Bridge needs analysis','UX & product audit','AI-UX workflow workshop','Design strategy sprint','Product architecture advisory','Mentorship and speaking']);
const trim=(v,max=200)=>typeof v==='string'?v.trim().slice(0,max):'';
const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&v.length<=254;
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Allow','POST');
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const origin=req.headers.origin||'';
  if(origin){try{const url=new URL(origin);if(url.protocol!=='https:'||!['melvinogbalu.com','www.melvinogbalu.com','melvins-portfolio.vercel.app'].includes(url.hostname)){return res.status(403).json({error:'Submission origin not permitted'})}}catch{return res.status(403).json({error:'Invalid origin'})}}
  const body=typeof req.body==='object'&&req.body?req.body:{};
  if(trim(body.website,100))return res.status(200).json({ok:true});
  const created=Number(body.startedAt||0);
  if(!created||!Number.isFinite(created)||Date.now()-created<1800||Date.now()-created>3600000)return res.status(400).json({error:'Please reopen the form and try again'});
  const name=trim(body.name,100),email=trim(body.email,254),company=trim(body.company,120);
  const service=trim(body.service,100),message=trim(body.message,3000),preferred=trim(body.preferred,80);
  const challenge=trim(body.challenge,1000),audience=trim(body.audience,600),stage=trim(body.stage,100);
  const goals=trim(body.goals,1000),consent=body.consent===true;
  if(name.length<2||!validEmail(email)||!ALLOWED_SERVICES.has(service)||message.length<15||message.length>3000||!consent)return res.status(400).json({error:'Please provide your name, valid email, service, a brief message and consent'});
  if(!process.env.RESEND_API_KEY)return res.status(503).json({error:'Contact delivery is temporarily unavailable. Please email melvinogbalu@gmail.com'});
  const clean=v=>v.replace(/[<>\r\n]/g,' ').trim();
  const lines=[
    'New portfolio enquiry', 'Service: '+clean(service),'Name: '+clean(name),
    'Email: '+clean(email),'Organisation: '+clean(company),
    'Preferred date or time: '+clean(preferred),'Product stage: '+clean(stage),
    'Audience: '+clean(audience),'Challenge: '+clean(challenge),
    'Goals: '+clean(goals),'Message: '+message.replace(/\r/g,''),
    'Consent: yes'
  ];
  let response;
  try{response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:'Melvin Portfolio <hello@xhunt.app>',to:['melvinogbalu@gmail.com'],reply_to:email,subject:'Portfolio enquiry: '+clean(service)+' — '+clean(name),text:lines.join('\n\n')})})}catch{return res.status(502).json({error:'Unable to send right now. Please use the email link instead'})}
  if(!response.ok){console.error('Contact delivery rejected',response.status);return res.status(502).json({error:'Unable to send right now. Please use the email link instead'})}
  return res.status(200).json({ok:true,message:'Thank you. Your enquiry has been sent; I will respond by email.'});
}