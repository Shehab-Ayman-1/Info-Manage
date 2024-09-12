export const Audio = () => {
    return (
        <div className="fixed -z-50 opacity-0">
            <audio src="/audio/success.mp3" className="success-audio" />
            <audio src="/audio/failor.mp3" className="failor-audio" />
        </div>
    );
};
