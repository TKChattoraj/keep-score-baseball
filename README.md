## Application to Keep Score of a Baseball Game

###Keep Score User Stories

As a ScoreKeeper user I want to:

1.  Input the lineup on a scorecard (scorecard-table) so that I know the batting order and who is up.
each batter to his own row.

2.  Input for each batter his number and position (1-9, PH) so that I know where he is playing on the field and what his number is.

[Technical:  ng-repeat to build the scorecard rows—ng repeat to build the innings columns within each row.  input fields for #, player and position data.  choose player from a dropdown of roster—then update lineup postion with player name, number.  Choose position form dropdown.]

3.  See what each batter did at the plate and on the basebath for each at bat.
    * Each batter will have his own row opposite his name in the lineup.
    * Each at-bat will be in its own column corresponding to which inning it occurred.  
    * at-bat box will show:
        * diamond with basebaths appropriately marked
            * if reach first—path to first is filled in and upper right text box filled in with how
            * if advance to third, path to third filled in
            * upper right, upper left and lower left text boxes will contain text explaining where the hit was or how advanced
            * if strikeout—text box in middle of diamond filled in.
                
[Technical:  update view in the at-bat box depending on state/data from the keep score box:  at-bat state:  out, reached base-single, double, triple, homerun, if out:  how-positions making the play, if on base:  how-where the hit was etc.  “upper-right box” will show the status of what the batter did at the plate, e.g. if he doubled to center, an “8” would appear in the upper right box.  “upper left box” and “lower-left box” would explain how he, as a runner, advanced, e.g. if he stole 3rd, an “SB” would appear in the upper-right box.  Then, if he stole home, a “SB” would appear in the lower-left box.]

4.  See the total hits and runs for each inning at the bottom of the score card.
    * This total will be updated automatically as events occur in the applicable inning, i.e.  batter gets a hit—that is marked on the scorecard and the total is updated automatically.
        
[Technical:  update Totals based on state of Hits/Runs.]

5. Click on an at-bat box to activate a larger field box that will allow me to “keep score.”
    * Upon activation, I want the scorecard table to fade/obscure a bit—still be there but clearly meant to as background-inactive.
    * Upon activation, the keep score box position will be determined by the at-bat box.  
        * the particular at-bat box can have various positions throughout the scorecard and so when activated the keep-score box needs to not cover that up.  

[Technical:  determine position of the at-bat box, center of keep score box x distance away, make scorecard fade, keep score box in the forefront with enough padding to inside the scorecard.]

6.  See an initial keep score box upon activation that shows a baseball diamond bases and “outs” activated so that I can make the basic choice of reach base/advance or out

[Technical:  each base and out bubbles need to be active—when clicked call appropriate functions.  need state of at-bat box—at the plate or on the basepath this will determine which view is shown after the basic choice is made reach base/advance or out.]

7.  Click on an “out” bubble to show 1, 2 or 3 outs and to activate the “out-box”
    * to see option buttons for how the out was made
        * out box to contain:
            * diamond with 1-9 positions activated and row of buttons up top row of buttons to contain “K”, “backwards K”, “SAC”   also “RBI” out bubbles appropriately filled in (one, two or three).
            * lower left “Go” button.
    * Click on the activated positions to record how the out was made
        * groundout to short (click “6” and then “3”)
        * strikeout looking (click backwards K).

[Technical: need to track the sequence of position buttons clicked —on click the position button attribute is saved to “how out” variable—maybe a string—or the out options button—which would also be saved to a “how out” variable—also need to track the number of times the “RBI” button is clicked—each click of the RBI button increments the RBI variable for the particular at-bat box (unique identifier for each batter/inning.]

8. Click on a base to show what base the batter reached and to activate the “on-base box”
    * diamond with position areas activated and row of buttons up top
        * row of button to include “K”, “backwards K”, “BB”, “E”, “FC”, “HB” and right justified “RBI”
            * for example if strike out swinging, “K” would appear in the upper right text box of the at-bat box
        * field areas activated and when clicked shows where the hit went.
            * if a hit to left then “7” would appear in the upper right text box of at-bat box.
            
[Technical:  similar tracking as what is required in #7 above.  Click on options or position areas would update a “on-reach-base” variable.  This variable would be bound to the upper right box of the at-bat box.  Basically click on an option or position and that calls a function to update the value of the on-reach-base variable depending on the button pushed.]

    * close the keep-score box, updates the at-bat box per the keep score box and reactivate the scorecard.
    
[Technical:  on-click “Go.”  Fade active the scorecard and the at-bat box would show the view depending on the basepath state with the appropriate “upper-right box,” “upper-left box,” or “lower-left box” updated. ]

9. In the Keep Score Box, click on the “Clear” button to clear the choices and start over.

[Technical:  on-click “Clear” would re-initialize all the variables/states that the particular keep score box has so that user can start over.]

10. Click on existing box-field so that I can update what happens on the basepath
    * See an initial keep score box upon activation that shows a baseball diamond bases and “outs” activated so that I can make the basic choice of reach advance or out.
    
[Technical:  this is essentially the same as #5 and #6.]
    * I want to see row of buttons to include: “WP”, “PB”, “E”, “B”, “SB” diamond view showing advancement
    * I want to click the appropriate choice and the hit “Go” to update score card.
    
[Technical:  this is similar functionality to that of #8—upon entering, update the base variable/state depending on what base was clicked on #11.  on-click the options—associated state/variable would be updated.  “Go” and “Clear” would operate similarly to #9 and #10.]

11. If out,
    * I want to see diamonds with position buttons activated.
    * I want to click on position buttons to show how the out was made.
    * I want to hit “Go” to update score card.

[Technical:  this is similar functionality to that of #7.  On-click a position will update the how-out variable which will permeate to the appropriate views (at-bat box).  “Go” and “Clear” would operate as defined.]

12. automatically send to the back-end game status
    * when —after each at-bat/advance event?  or after every inning
    * what to update?  seems like just the raw material and then let the back end calculate the states.  

[Technical:  The previous User Stories don’t seem to be too difficult.  #14 seems more difficult, would require I have some api set up, not to mention a back end to receive everything.]