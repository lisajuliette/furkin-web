export type LaunchState = 'waitlist' | 'live';

export function launchState(): LaunchState {
  return process.env.NEXT_PUBLIC_LAUNCH_STATE === 'live' ? 'live' : 'waitlist';
}
