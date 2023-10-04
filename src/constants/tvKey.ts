let tvKey = {};

export const platformTvKeysMeth: any = () => {
    switch (process.env.PLATFORM?.toLowerCase()) {
        case 'lg':
            tvKey = {
                KEY_RETURN: 461,
                KEY_EXIT: 27,
                KEY_UP: 38,
                KEY_DOWN: 40,
                KEY_LEFT: 37,
                KEY_RIGHT: 39,
                KEY_ENTER: 13,
                KEY_BACK: 8
            };
            break;
        case 'samsung':
            tvKey = {
                KEY_CANCEL_KEYBOARD: 65385,
                KEY_DONE_KEYBOARD: 65376,
                KEY_BACK: 8,
                KEY_RETURN: 10009,
                // KEY_EXIT : EXIT_KEY,
                KEY_UP: 38,
                KEY_DOWN: 40,
                KEY_LEFT: 37,
                KEY_RIGHT: 39,
                KEY_ENTER: 13,
                KEY_REWIND: 412,
                KEY_FASTFORWARD: 417,
                KEY_PLAY: 415,
                KEY_PAUSE: 19,
                KEY_STOP: 413,
                KEY_1: 49,
                KEY_2: 50,
                KEY_3: 51,
                KEY_4: 52,
                KEY_5: 53,
                KEY_6: 54,
                KEY_7: 55,
                KEY_8: 56,
                KEY_9: 57,
                KEY_0: 48
            };
            break;
        default:
            tvKey = {
                KEY_RETURN: 8,
                KEY_EXIT: 27,
                KEY_UP: 38,
                KEY_DOWN: 40,
                KEY_LEFT: 37,
                KEY_RIGHT: 39,
                KEY_ENTER: 13
            };
    }
    return tvKey;
};
