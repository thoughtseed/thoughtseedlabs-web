import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = {
  matcher: ['/api/config']
};

export async function middleware() {
  try {
    // Single API call to get all config
    const config = await get('config');
    
    if (!config) {
      // Return defaults if no config found
      return NextResponse.json({
        audio: { autoPlay: true },
        features: {
          snowEnabled: true,
          waypointsEnabled: true
        }
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Edge Config error:', error);
    // Return defaults on error
    return NextResponse.json({
      audio: { autoPlay: true },
      features: {
        snowEnabled: true,
        waypointsEnabled: true
      }
    });
  }
}
