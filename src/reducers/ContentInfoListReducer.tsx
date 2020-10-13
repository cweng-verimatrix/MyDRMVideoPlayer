import {ADD_CONTENT, UPDATE_CONTENT} from "../actions/ContentInfoActions";

const initialState = [
    {
        id: 1,
        contentName: 'VMX OTT Content',
        contentURL: 'https://ott-content.s3.us-east-1.amazonaws.com/gdvcas.us-east-1.vmxdemos.net/meridian-clear/asset.mpd',
    },
    {
        id: 2,
        contentName: 'VMX OTT Content',
        contentURL: 'https://ott-content.s3.us-east-1.amazonaws.com/gdvcas.us-east-1.vmxdemos.net/meridian-clear/asset.mpd',
    },
    {
        id: 3,
        contentName: 'Microsoft Playready Content',
        contentURL: 'https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest(format=mpd-time-csf)',
    },
    {
        /*
        {
            "com.widevine.alpha": "https://widevine-proxy.appspot.com/proxy"
        }
        */
        id: 4,
        contentName: 'Tears of Steel Widevine',
        contentURL: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd'
    },
    {
         /*
         {
             "com.microsoft.playready": {
               "url": "https://drm-playready-licensing.axtest.net/AcquireLicense",
               "licenseHeaders": {
                 "X-AxDRM-Message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA"
               }
             },
             "com.widevine.alpha": {
               "url": "https://drm-widevine-licensing.axtest.net/AcquireLicense",
               "licenseHeaders": {
                 "X-AxDRM-Message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA"
              }
            }
         }
         */
        id: 5,
        contentName: 'Axinom 4k PlayReady with License Headers',
        contentURL: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest.mpd'
    }
];

const contentInfoList = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_CONTENT:
            return [
                ...state,
                {
                    id: action.payload.id,
                    contentName: action.payload.contentName,
                    contentURL: action.payload.contentURL,
                }
            ];
        case UPDATE_CONTENT:
            console.log('hit');
            return [...action.payload];
        default:
            return state;
    }
};

export default contentInfoList;