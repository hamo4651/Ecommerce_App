<?php

namespace App\Http\Controllers\Auth;

use App\Events\RegisterUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            $idToken = $request->get('id_token');
            
            // Verify the ID token using Google's token info endpoint
            $client = new Client();
            $response = $client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={$idToken}");
    
            $googleUser = json_decode($response->getBody()->getContents());
    
            // Check if the Google user data is valid
            if (!$googleUser || !isset($googleUser->sub)) {
                return response()->json(['error' => 'Invalid token'], 401);
            }
    
            // Now you can safely create or log in the user
            $userfound = User::where('social_id', $googleUser->sub)->first();
    
            if ($userfound) {

                return response()->json([
                    'user' => $userfound,
                    'token' => $userfound->createToken('ecomm')->plainTextToken
                ]);
            }
    
            // If the user doesn't exist, create a new one
            $user = User::firstOrCreate([
                'social_id' => $googleUser->sub
            ], [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'image' => $googleUser->picture,
                'social_type' => 'google',
                'password' => Hash::make('my-google') // You can set a default password or leave this empty for social login
            ]);
            event(new RegisterUser($user));

            return response()->json([
                'user' => $user,
                'token' => $user->createToken('ecomm')->plainTextToken
            ]);
        } catch (\Exception $e) {
            // Log errors for debugging
            Log::error('Google OAuth Error: ' . $e->getMessage());
            Log::error('Stack Trace: ' . $e->getTraceAsString());
    
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
    
    
}