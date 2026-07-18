'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Pencil, MessageSquare, Send } from 'lucide-react';

export function ContactSection() {
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [status,setStatus]=useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [error,setError]=useState('');

  const input='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/40';

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus('submitting');setError('');
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      if(!res.ok){const d=await res.json();throw new Error(d.error||'Unable to send message.');}
      setStatus('success');
      setForm({name:'',email:'',subject:'',message:''});
    }catch(err:any){setStatus('error');setError(err.message);}
  }

  return <section id="contact" className="relative overflow-hidden px-6 py-24">
    <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-primary-accent/20 blur-[120px]" />
    <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />
    <div className="relative mx-auto max-w-6xl">
      <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-12 text-center">
        <p className="uppercase tracking-[.35em] text-primary-accent text-sm">Contact</p>
        <h2 className="mt-4 text-4xl font-bold text-white">Let's Build Something Amazing</h2>
        <p className="mt-3 text-primary-light/70">Have a project or idea? Send me a message.</p>
      </motion.div>
      <motion.form onSubmit={handleSubmit} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Field icon={<User size={16}/>} label="Name"><input required className={input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></Field>
          <Field icon={<Mail size={16}/>} label="Email"><input type="email" required className={input} value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></Field>
          <div className="md:col-span-2"><Field icon={<Pencil size={16}/>} label="Subject"><input required className={input} value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/></Field></div>
          <div className="md:col-span-2"><Field icon={<MessageSquare size={16}/>} label="Message"><textarea rows={6} required className={input+' resize-none'} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></Field></div>
          <div className="md:col-span-2 flex flex-wrap justify-between items-center gap-4">
            <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} disabled={status==='submitting'} className="group flex items-center gap-3 rounded-full bg-primary-accent px-8 py-4 font-semibold uppercase tracking-wider text-white hover:shadow-[0_0_35px_rgba(201,162,77,.5)]">
              {status==='submitting'?'Sending...':'Send Message'} <Send size={18} className="group-hover:translate-x-1 transition"/>
            </motion.button>
            <AnimatePresence>
            {status==='success'&&<motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-green-400">✓ Message sent successfully.</motion.p>}
            {status==='error'&&<motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-red-400">{error}</motion.p>}
            </AnimatePresence>
          </div>
        </div>
      </motion.form>
    </div>
  </section>
}
function Field({icon,label,children}:{icon:React.ReactNode,label:string,children:React.ReactNode}){
 return <div><label className="mb-2 flex items-center gap-2 text-white">{icon}{label}</label>{children}</div>
}
