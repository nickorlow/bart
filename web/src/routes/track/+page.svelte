<style>
    table, th, td {
        border: 1px solid;
    }
    td {
        padding: 4px;
    }
    .pin-box {
        width: 50px;
        height: 50px;
    }

    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
    
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }

    .mark-button {
        padding: 10px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { writable } from "svelte/store";
    import {Bowler, BowlerGame, Frame, FrameThrowState, Game} from "../../protos/game";
	import { walk } from "svelte/compiler";

    let new_bowler_name: string;
    let new_alley_name: string;
    let bowlers: string[] = [];

    let game: Game = new Game();

    let cur_bowler = 0;
    let cur_frame = 0;
    let cur_throw = 0;
    let cur_pinfall: boolean[] = Array(10).fill(false);
    let game_over: boolean = false;
    let ball_weight: number = 0;
    let ball_speed: number = 0.0;

    let fts: Frame;

    function bytesToBase64(bytes) {
      const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
      ).join("");
      return btoa(binString);
    }

    function base64ToBytes(base64) {
      const binString = atob(base64);
      return Uint8Array.from(binString, (m) => m.codePointAt(0));
    }

    function gameAsBase64(): string 
    {
        return bytesToBase64(game.serialize())
    }

    function base64ToGame(base64: string)
    {
        game = Game.deserialize(base64ToBytes(base64))
    }

    function process_frame(fill_out: boolean = false) {
        if (cur_throw == 0) {
            fts = new Frame();
            fts.first_throw = new FrameThrowState();
            fts.second_throw = new FrameThrowState();

            game.bowler_games[cur_bowler].frames[cur_frame] = fts;

            fts.first_throw.ball_weight = ball_weight;
            fts.first_throw.ball_speed = ball_speed;

            if (fill_out || cur_pinfall.filter(Boolean).length == 10) {
                fts.first_throw.pins_standing = 0;
                fts.second_throw.pins_standing = 0;
                fts.first_throw.is_standing = cur_pinfall.map((x) => false)
                fts.second_throw.is_standing = cur_pinfall.map((x) => false)

                for(let i = 0; i < 10; i++)
                    cur_pinfall[i] = false;

                if (cur_bowler == game.bowler_games.length - 1) {
                    cur_frame++;
                    cur_bowler = 0;
                } else {
                    cur_bowler++;
                }
            } else {
                fts.first_throw.pins_standing = 10 - cur_pinfall.filter(Boolean).length;
                fts.first_throw.is_standing = cur_pinfall.map((x) => !x)

                cur_throw++;
            }

        } else {
            if (fill_out) {
                fts.second_throw.pins_standing = 0;
                fts.second_throw.is_standing = cur_pinfall.map((x) => false)
            } else {
                fts.second_throw.pins_standing =  10 - cur_pinfall.filter(Boolean).length;
                fts.second_throw.is_standing = cur_pinfall.map((x) => !x)
            }

            fts.second_throw.ball_weight = ball_weight;
            fts.second_throw.ball_speed = ball_speed;

            for(let i = 0; i < 10; i++)
                cur_pinfall[i] = false;

            cur_throw = 0;
            if (cur_bowler == game.bowler_games.length - 1) {
                cur_bowler = 0;
                cur_frame++;
            } else {
                cur_bowler++;
            }
        }

        ball_speed = 0.0;

        game.bowler_games = game.bowler_games;
        window.localStorage.setItem('cur_gamedata', gameAsBase64());

        game_over = cur_frame == 10
        if (game_over) {
            let start_date = new Date(game.time_played)
            createDownloadLink(game.alley + "-" + start_date.toLocaleDateString() + "-" + start_date.toLocaleTimeString(), gameAsBase64()).click()
        }
    }

    function frame_to_string(frame: Frame, frame_num: number): string {
        let t1: string = "";
        let t2: string = "";

        if (frame.first_throw.pins_standing == 0)
            return "X";
        else 
            t1 = (10 -frame.first_throw.pins_standing).toString(); 
        
        if (frame.second_throw.pins_standing == 0)
            t2 = "/"
        else if (frame.second_throw.has_pins_standing) 
            t2 = (frame.first_throw.pins_standing - frame.second_throw.pins_standing ).toString(); 

        return t1 + " " + t2;
    }

    function readSingleFile(e: any) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target!.result;
        displayContents(contents);
      };
      reader.readAsText(file);
    }
    
    function displayContents(contents: any) {
        const binString = atob(contents);
        const arr = Uint8Array.from(binString, (m) => m.codePointAt(0));
        game = Game.deserialize(arr)
        alert('updated game!')
    }

    window.addEventListener('load', function () {
        document.getElementById('file-input')!
          .addEventListener('change', readSingleFile, false);
        console.log('added')
        window.localStorage
    })


    function throwOutGame() 
    {
        window.localStorage.removeItem('cur_gamedata');
        game = new Game()
    }

    function createDownloadLink(filename: string, data: string) {
      var dataUri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(data);
      var anchor = document.createElement('a');
      anchor.setAttribute('href', dataUri);
      anchor.setAttribute('download', filename);
      return anchor;
    }

    let gamedata: string | null = window.localStorage.getItem('cur_gamedata')
    if (gamedata != null)
        base64ToGame(gamedata);
</script>

<div>

{#if game.bowler_games.length == 0}
<h2>Setup Game</h2>

<h3>Bowling Alley Name</h3>
<input bind:value={new_alley_name} /> 

<h3>Bowlers</h3>
<ul>
    {#each bowlers as bowler, i}
        <li>
            {bowler}
            <button on:click={() => {
                bowlers.splice(i, 1);
                bowlers = bowlers;
            }}>remove</button>
        </li>
    {/each}
</ul>

<form on:submit|preventDefault={() => {document.getElementById("bowler-name-input").focus()}}>
    <input id="bowler-name-input" bind:value={new_bowler_name}/>
    <button on:click={() => {
        bowlers = [...bowlers, new_bowler_name];
        new_bowler_name = "";
    }}>add</button>
</form>

<div>
    <button on:click={()=>{
        if (!new_alley_name || new_alley_name.length < 1) {
            alert("Enter a name for the bowling alley!");
            return;
        }
        if (bowlers && bowlers.length < 1) {
            alert("Enter at least one bowler!");
            return;
        }
        game.id = 1;
        game.alley = new_alley_name;
        game.time_played = new Date().getTime();

        for (const bowler of bowlers)
        {
            let bowler_game = new BowlerGame();
            bowler_game.frames = [];
            bowler_game.bowler = bowler;
            bowler_game.score = 0;
            game.bowler_games.push(bowler_game);
        }
    }}>Start Game</button>
</div>

<h3>Or upload in progress game</h3>
<input type="file" id="file-input" />
{/if}


{#if game.bowler_games.length > 0}

<div style="width: 100%; display: flex; justify-content: space-between;">
    <p>Game started at {new Date(game.time_played).toLocaleTimeString()}
                {#if game_over}
                <b> FINAL</b>
                {/if}
            </p>
    <div>
        <p><button on:click={()=>{throwOutGame()}}>New Game</button></p>
        <p><button on:click={()=>{createDownloadLink("game.bart", bytesToBase64(game.serialize())).click()}}>Download Game File</button></p>
    </div>
</div>
<table style="width: 100%">
    <tr>
        <th>Bowler</th>
        {#each {length: 10} as _, i}
            <th>{i + 1}</th>
        {/each}
        <th>Score</th>
    </tr>
    {#each game.bowler_games as bowler_game, j} 
        <tr>
            <td>{bowler_game.bowler}</td>
            {#each {length: 10} as _, i}
                <td style={(i == cur_frame && cur_bowler == j) ? "border-color: red; border-width: 3px;" : ""}>
                    {#if i < bowler_game.frames.length}
                        <div class="tooltip">
                            {frame_to_string(bowler_game.frames[i], i)}
                            <span class="tooltiptext">{@html function () {
                                let ret = "";
                                for(let k = 0; k < 10; k++) 
                                {
                                    ret += bowler_game.frames[i].first_throw.is_standing[k] ? "|" : "_";
                                    ret += " ";
                                    if (k == 0 || k == 2 || k == 5)
                                        ret += "<br/>"
                                }
                                ret += "<br/>";
                                ret += "Speed: " + bowler_game.frames[i].first_throw.ball_speed + " mph";
                                ret += "<br/>";
                                ret += "Weight: " + bowler_game.frames[i].first_throw.ball_weight + " lbs";
                                return ret
                            }()}</span>
                        </div>
                    {:else}
                    {/if}
                </td>
            {/each}
            <td>{bowler_game.score}</td>
        </tr>
    {/each}
</table>

{#if !game_over}
<p>Throw <input style="width: 2em;" bind:value={cur_throw}/> of frame <input style="width: 2em;" bind:value={cur_frame}/> for {game.bowler_games[cur_bowler].bowler} (id <input style="width: 2em;" bind:value={cur_bowler}/>) at {game.alley}</p>
<div style="display: flex; justify-content: center; width: 100%;">
    <div>
        <div style="width: min-content;">
            <div style="display: flex; justify-content: center;">
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[6]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[7]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[8]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[9]}>
            </div>
            <div style="display: flex; justify-content: center;">
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[3]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[4]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[5]}>
            </div>
            <div style="display: flex; justify-content: center;">
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[1]}>
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[2]}>
            </div>
            <div style="display: flex; justify-content: center;">
                <input class="pin-box" type="checkbox" bind:checked={cur_pinfall[0]}>
            </div>
        </div>
        
        <div>
            <div style="display: flex; margin-top: 10px; margin-bottom: 10px; justify-content: space-between;">
            <input type="range" min="1" max="16" step="1" class="slider" id="myRange" bind:value={ball_weight}> 
            <p>{ball_weight} lb ball</p>
            </div>
            <div style="display: flex; margin-top: 10px; margin-bottom: 10px; justify-content: space-between;">
            <input type="range" min="0" max="30" step="0.1" class="slider" id="myRange" bind:value={ball_speed}> 
            <p>{ball_speed} mph</p>
            </div>
            <button disabled={game_over} class="mark-button" on:click={() => {process_frame(false)}}>Mark Frame</button>
        
            {#if cur_throw == 0}
                <button class="mark-button" on:click={() => {process_frame(true)}}>Mark Frame as Strike</button>
            {:else}
                <button class="mark-button" on:click={() => {process_frame(true)}}>Mark Frame as Spare</button>
            {/if}
        </div>
    </div>
</div>
{/if}
{/if}
</div>
