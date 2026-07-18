'use client';

// NOTE: This is a starter premium version. Replace your existing component.
// Add: npm i lucide-react react-icons if needed.

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, Send, Building2, User, Mail } from 'lucide-react';

export function FeedbackSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 5,
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  const input =
    'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/40';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      });

      if(!res.ok){
        const data = await res.json();
        throw new Error(data.error || 'Unable to submit feedback.');
      }

      setStatus('success');
      setForm({name:'',email:'',rating:5,company:'',message:''});
    } catch(err:any){
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <section id="feedback" className="relative overflow-hidden px-6 py-24">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-primary-accent/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-12 text-center">
          <p className="uppercase tracking-[0.35em] text-primary-accent text-sm">Feedback</p>
          <h2 className="mt-4 text-4xl font-bold text-white">I'd Love Your Feedback</h2>
          <p className="mt-3 text-primary-light/70">Tell me about your experience.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-white"><User size={16}/>Name</label>
              <input className={input} required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-white"><Mail size={16}/>Email</label>
              <input type="email" className={input} required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-white"><Building2 size={16}/>Company</label>
              <input className={input} value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
            </div>

            <div>
              <p className="mb-3 text-white">Rating</p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(star=>(
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{scale:1.2,rotate:8}}
                    whileTap={{scale:.9}}
                    onClick={()=>setForm({...form,rating:star})}>
                    <Star className={star<=form.rating?'fill-yellow-400 text-yellow-400':'text-gray-500'} />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-white">Feedback</label>
              <textarea rows={6} className={input+" resize-none"} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
            </div>

            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
              <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:.95}}
                disabled={status==='submitting'}
                className="group flex items-center gap-3 rounded-full bg-primary-accent px-8 py-4 font-semibold uppercase tracking-wider text-white hover:shadow-[0_0_35px_rgba(201,162,77,.5)]">
                {status==='submitting'?'Submitting...':'Submit Feedback'}
                <Send size={18} className="transition-transform group-hover:translate-x-1"/>
              </motion.button>

              <AnimatePresence>
                {status==='success' && <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-green-400">✓ Feedback submitted successfully.</motion.p>}
                {status==='error' && <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-red-400">{error}</motion.p>}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
