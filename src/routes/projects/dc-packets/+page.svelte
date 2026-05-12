<script>
    import { base } from '$app/paths';
    import Header from '../../Header.svelte';
    import ProjectSection from '$lib/ProjectSection.svelte';
    import ProjectSectionBigPic from '$lib/ProjectSectionBigPic.svelte';

    const masada = `${base}/assets/masada_test.png`;
    const proc_diag = `${base}/assets/datacom_process_diag_black.png`;
</script>

<Header></Header>

<section class="high-level-description centered">

    <ProjectSectionBigPic>
        <div slot="description">
            <h1>DATACOM</h1>
            <!-- <h3>Visual Command and Control Terminal for Air and Space</h3>
            <h4>Ongoing</h4> -->
            <hr width="100%">
            <p>DATACOM uses a simple graphics engine, but don't let that fool you. Under the hood, it has a surprisingly robust signal routing system that allows bidirectional data transmission and display across multiple sources simulatneously while remaining snappy for the user.</p>
            <br>
            <p>First, the client attempts to connect to one or more TCP streams. It fetches a list of acceptable ports from a config file, then attempts to connect to each one until a time limit is reached. This allows it to connect to multiple streams simultaneously, which are all stored in a vector.</p>
            <br>
            <p>For each stream, the client spawns three threads: a listener, a sender, and an assembler. The listener reads data sent along the stream, the sender writes data to the stream, and the assembler takes the received data and constructs files from them. The data transfer occurs in two stages. The first is for initial files, like object and scene data, that the client needs to construct the scene. The second is for object transform and other data, and lasts indefinitely.</p>
            <br>
            <!-- <p>First, the listener and sender establish an acknowledgement with their respective servers. Then the listener repeatedly reads from the stream and sends the data to the assembler, which will do most of the work at this stage. The data is received into a buffer, the first two bytes of which are converted to a MessageType enum. This will determine what we do with the rest of the received data. The transmission should start with a FILE_START message, which will be followed by the transmitted file’s metadata. This includes its ID, name, and length. The buffer will accept data until it has enough to construct a FileInfo object, which will contain the metadata and received data for each file. The object will also contain a next_expected_chunk_offset and a buffer to deal with chunks transmitted out of order. These FileInfos are stored in a hash map in the assembler, where the keys are the file IDs.</p>
            <br>
            <p>If a FILE_CHUNK message is received, it will be accompanied by a smaller amount of metadata, containing the ID of the file it is meant for, the chunk offset, chunk length, and a checksum. If the two checksums do not match, the assembler will give the sender thread a request for that chunk to be retransmitted. If they match, the payload is stored in the corresponding FileInfo. The expected chunk offset is checked, and if they do not match, the chunk is stored in the reorder buffer. This buffer will be emptied when the next contiguous chunk is received.</p>
            <br>
            <p>If a FILE_END message is received, all the data in the FileInfo will be written to an actual file, and the object is cleared. The file assembly will continue until a TRANSMISSION_END message is received. After this, the three threads will close.</p>
            <br>
            <p>Once all of the threads have closed, the initial file transfer will be complete. The client has the data to generate the initial scene. Once it has done this and begun running the event loop, a similar process will begin for the indefinite file transfer.</p> -->
        </div>
        <div slot="image">
            <img loading="lazy" src={proc_diag} alt="DATACOM Test">
        </div>
    </ProjectSectionBigPic>

    <ProjectSection imagePosition="none">
        
        <div slot="description">
            <!-- <h1>DATACOM</h1> -->
            <!-- <h3>Visual Command and Control Terminal for Air and Space</h3> -->
            <!-- <h4>Ongoing</h4> -->
            <!-- <hr width="100%"> -->
            <!-- <p>First, the client attempts to connect to one or more TCP streams. It fetches a list of acceptable ports from a config file, then attempts to connect to each one until a time limit is reached. This allows it to connect to multiple streams simultaneously, which are all stored in a vector.</p>
            <br>
            <p>For each stream, the client spawns three threads: a listener, a sender, and an assembler. The listener reads data sent along the stream, the sender writes data to the stream, and the assembler takes the received data and constructs files from them. The data transfer occurs in two stages. The first is for initial files, like object and scene data, that the client needs to construct the scene. The second is for object transform and other data, and lasts indefinitely.</p> -->
            <br>
            <p>First, the listener and sender establish an acknowledgement with their respective servers. Then the listener repeatedly reads from the stream and sends the data to the assembler, which will do most of the work at this stage. The data is received into a buffer, the first two bytes of which are converted to a MessageType enum. This will determine what we do with the rest of the received data. The transmission should start with a FILE_START message, which will be followed by the transmitted file’s metadata. This includes its ID, name, and length. The buffer will accept data until it has enough to construct a FileInfo object, which will contain the metadata and received data for each file. The object will also contain a next_expected_chunk_offset and a buffer to deal with chunks transmitted out of order. These FileInfos are stored in a hash map in the assembler, where the keys are the file IDs.</p>
            <br>
            <p>If a FILE_CHUNK message is received, it will be accompanied by a smaller amount of metadata, containing the ID of the file it is meant for, the chunk offset, chunk length, and a checksum. If the two checksums do not match, the assembler will give the sender thread a request for that chunk to be retransmitted. If they match, the payload is stored in the corresponding FileInfo. The expected chunk offset is checked, and if they do not match, the chunk is stored in the reorder buffer. This buffer will be emptied when the next contiguous chunk is received.</p>
            <br>
            <p>If a FILE_END message is received, all the data in the FileInfo will be written to an actual file, and the object is cleared. The file assembly will continue until a TRANSMISSION_END message is received. After this, the three threads will close.</p>
            <br>
            <p>Once all of the threads have closed, the initial file transfer will be complete. The client has the data to generate the initial scene. Once it has done this and begun running the event loop, a similar process will begin for the indefinite file transfer.</p>
        </div>
        
    </ProjectSection>
</section>

<style>
    section {
        background-size: cover;
        position: relative;
        z-index: -10;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    .centered {
        align-content: center;
    }

</style>
