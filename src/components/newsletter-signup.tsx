'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { subscribeToNewsletter } from '@/actions/newsletter';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  );
}

export function NewsletterSignup() {
  const [state, formAction] = useFormState(subscribeToNewsletter, { message: '', success: false });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <div className="max-w-xl mx-auto text-center">
      <h3 className="font-headline text-2xl font-bold">Stay Inspired</h3>
      <p className="mt-2 text-muted-foreground">
        Get the latest articles, stories, and project updates delivered straight to your inbox.
      </p>
      <form ref={formRef} action={formAction} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <Input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          required
          className="flex-1"
        />
        <SubmitButton />
      </form>
      <p className="mt-4 text-xs text-muted-foreground">No spam, ever. Unsubscribe at any time.</p>
    </div>
  );
}
