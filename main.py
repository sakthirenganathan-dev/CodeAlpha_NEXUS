#!/usr/bin/env python3
"""
================================================================================
PROJECT: HANGMAN // NEXUS
A Futuristic Word Decryption Terminal
================================================================================
Author: Nexus Security Systems
Core Concepts:
  - random: for secret word selection
  - while loops: for continuous game state loop and input validation
  - if-else: for game logic, conditions, win/loss detection
  - strings: for text manipulation and box-drawing alignment
  - lists: for tracking guessed letters and word databases
================================================================================
"""

import os
import sys
import time
import random

# -----------------------------------------------------------------------------
# TERMINAL COMPATIBILITY CONFIGURATION
# -----------------------------------------------------------------------------
# On Windows, ensure standard output handles UTF-8 unicode box-drawing characters
# and enable Virtual Terminal Processing for ANSI colors.
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")
    os.system("")  # Initializes ANSI escape processing in Windows Command Prompt

# -----------------------------------------------------------------------------
# ANSI COLOR PALETTE
# -----------------------------------------------------------------------------
CYAN = "\033[96m"
BRIGHT_WHITE = "\033[97m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
PURPLE = "\033[95m"
BLUE = "\033[94m"
GRAY = "\033[90m"
BOLD = "\033[1m"
RESET = "\033[0m"

# Layout Dimensions
# BOX_WIDTH is the inner character space between the left and right border walls
# Total outer width = BOX_WIDTH + 2 = 54 characters (fits standard terminals)
BOX_WIDTH = 52
MAX_INCORRECT_GUESSES = 6


def clear_screen():
    """Clears the console screen across Windows and Unix platforms."""
    os.system("cls" if os.name == "nt" else "clear")


# -----------------------------------------------------------------------------
# UI BOX RENDERING HELPERS
# -----------------------------------------------------------------------------
# To guarantee 100% pixel-perfect alignment, plain text without ANSI codes is
# measured and padded to the exact box width before applying colors to borders.
def box_top(color=CYAN):
    """Returns the top border of a panel: ╔═══...═══╗"""
    return f"{color}╔{'═' * BOX_WIDTH}╗{RESET}"


def box_divider(color=CYAN):
    """Returns a middle divider border: ╠═══...═══╣"""
    return f"{color}╠{'═' * BOX_WIDTH}╣{RESET}"


def box_bottom(color=CYAN):
    """Returns the bottom border of a panel: ╚═══...═══╝"""
    return f"{color}╚{'═' * BOX_WIDTH}╝{RESET}"


def box_line(text="", align="left", text_color=BRIGHT_WHITE, border_color=CYAN, padding=2):
    """
    Renders a line enclosed inside ║ ... ║ with exact padding.
    text: Plain string without ANSI codes to avoid any column misalignments.
    align: 'left', 'center', or 'right'
    """
    usable_width = BOX_WIDTH - (padding * 2)
    if align == "center":
        content = text.center(usable_width)
    elif align == "right":
        content = text.rjust(usable_width)
    else:
        content = text.ljust(usable_width)

    pad_space = " " * padding
    return f"{border_color}║{pad_space}{text_color}{content}{border_color}{pad_space}║{RESET}"


# -----------------------------------------------------------------------------
# STARTUP BOOT SEQUENCE
# -----------------------------------------------------------------------------
def boot_sequence():
    """
    Displays the initial cyber terminal boot sequence.
    Provides a short, professional, and immersive startup experience.
    """
    clear_screen()
    print()
    print(box_top(CYAN))
    print(box_line("", align="center"))
    print(box_line("H A N G M A N  //  N E X U S", align="center", text_color=CYAN + BOLD))
    print(box_line("", align="center"))
    print(box_line("WORD DECRYPTION TERMINAL", align="center", text_color=BRIGHT_WHITE))
    print(box_line("", align="center"))
    print(box_bottom(CYAN))
    print()

    boot_logs = [
        ("Initializing Nexus core system...", 0.25),
        ("Loading encrypted word database...", 0.25),
        ("Security protocol active...", 0.25),
        ("Encryption layer ready...", 0.25),
    ]

    for log, pause in boot_logs:
        print(f" {GRAY}[{CYAN} SYSTEM {GRAY}]{RESET} {BRIGHT_WHITE}{log}{RESET}")
        time.sleep(pause)

    print()
    print(f" {GRAY}STATUS:{RESET} {GREEN}{BOLD}ONLINE{RESET}")
    print()
    input(f" {GRAY}Press {CYAN}[ENTER]{GRAY} to begin mission...{RESET}")


# -----------------------------------------------------------------------------
# MAIN GAME DISPLAY FUNCTION
# -----------------------------------------------------------------------------
def display_game(secret_word, guessed_letters, incorrect_count, feedback_type, feedback_title, feedback_detail):
    """
    Renders the unified cyber dashboard containing:
      1. Terminal Header
      2. Hidden / Revealed Target Word
      3. Security Status & Visual Progress Indicator
      4. Decoded Letters Bank
      5. Contextual Feedback Notice Box
    """
    clear_screen()
    print()

    # 1. Main Dashboard Header
    print(box_top(CYAN))
    print(box_line("NEXUS // DECRYPTION TERMINAL", align="center", text_color=CYAN + BOLD))
    print(box_divider(CYAN))

    # 2. Target Word Display
    # Converts letters to uppercase and displays revealed letters or underscores
    # Examples: P  _  _  _  O  _
    display_letters = []
    for letter in secret_word:
        if letter in guessed_letters:
            display_letters.append(letter.upper())
        else:
            display_letters.append("_")

    formatted_word = "  ".join(display_letters)

    print(box_line("", align="left"))
    print(box_line("TARGET WORD", align="left", text_color=GRAY))
    print(box_line("", align="left"))
    print(box_line(formatted_word, align="center", text_color=BRIGHT_WHITE + BOLD))
    print(box_line("", align="left"))
    print(box_divider(CYAN))

    # 3. Security Status & Progress Indicator
    # Visual indicators: [●] for failed attempt, [○] for remaining chance
    # Also displays percentage integrity
    remaining = MAX_INCORRECT_GUESSES - incorrect_count
    integrity_pct = int(((MAX_INCORRECT_GUESSES - incorrect_count) / MAX_INCORRECT_GUESSES) * 100)

    # Dynamic status bar color based on remaining lives
    if incorrect_count <= 1:
        status_color = GREEN
        status_text = "OPTIMAL"
    elif incorrect_count <= 3:
        status_color = YELLOW
        status_text = "ELEVATED"
    elif incorrect_count <= 5:
        status_color = RED
        status_text = "CRITICAL"
    else:
        status_color = RED + BOLD
        status_text = "LOCKDOWN"

    # Build the indicator bar: e.g. [●][●][○][○][○][○]
    progress_bar = "".join("[●]" if i < incorrect_count else "[○]" for i in range(MAX_INCORRECT_GUESSES))
    attempts_str = f"Failed Attempts     {progress_bar} {incorrect_count} / {MAX_INCORRECT_GUESSES}"
    remaining_str = f"Remaining Tries     {remaining}"
    integrity_str = f"Security Integrity  {integrity_pct}%  [{status_text}]"

    print(box_line("SECURITY STATUS", align="left", text_color=GRAY))
    print(box_line("", align="left"))
    print(box_line(attempts_str, align="left", text_color=status_color))
    print(box_line(remaining_str, align="left", text_color=BRIGHT_WHITE))
    print(box_line(integrity_str, align="left", text_color=status_color))
    print(box_line("", align="left"))
    print(box_divider(CYAN))

    # 4. Decoded Letters Bank
    # Lists all guessed characters sorted alphabetically
    print(box_line("DECODED LETTERS", align="left", text_color=GRAY))
    print(box_line("", align="left"))

    if guessed_letters:
        sorted_guesses = sorted([letter.upper() for letter in guessed_letters])
        letters_display = "  ".join(sorted_guesses)
    else:
        letters_display = "[ NO DATA TRANSMITTED ]"

    print(box_line(letters_display, align="left", text_color=PURPLE + BOLD))
    print(box_line("", align="left"))
    print(box_bottom(CYAN))

    # 5. Feedback Notice Panel
    # Color-coded box communicating previous action result
    if feedback_type == "SUCCESS":
        fb_border = GREEN
        fb_title_color = GREEN + BOLD
    elif feedback_type == "ERROR":
        fb_border = RED
        fb_title_color = RED + BOLD
    elif feedback_type == "WARNING":
        fb_border = YELLOW
        fb_title_color = YELLOW + BOLD
    else:  # INFO
        fb_border = CYAN
        fb_title_color = CYAN + BOLD

    print()
    print(box_top(fb_border))
    print(box_line(feedback_title, align="left", text_color=fb_title_color, border_color=fb_border))
    print(box_line(feedback_detail, align="left", text_color=BRIGHT_WHITE, border_color=fb_border))
    print(box_bottom(fb_border))
    print()


# -----------------------------------------------------------------------------
# PLAYER INPUT HANDLING
# -----------------------------------------------------------------------------
def get_guess():
    """
    Renders a cyber input box and captures the operator's input.
    Returns:
        The stripped string entered by the player.
    """
    print(f"{CYAN}╭{'─' * BOX_WIDTH}╮{RESET}")
    user_input = input(f"{CYAN}│  DECRYPTION KEY > {BRIGHT_WHITE}").strip()
    print(f"{CYAN}╰{'─' * BOX_WIDTH}╯{RESET}")
    return user_input


# -----------------------------------------------------------------------------
# WIN & LOSS SCREENS
# -----------------------------------------------------------------------------
def show_win_screen(secret_word, incorrect_count):
    """
    Renders the futuristic victory screen when the player decodes the target word.
    """
    clear_screen()
    print()
    print(box_top(GREEN))
    print(box_line("", align="center", border_color=GREEN))
    print(box_line("ACCESS GRANTED", align="center", text_color=GREEN + BOLD, border_color=GREEN))
    print(box_line("", align="center", border_color=GREEN))
    print(box_line("DECRYPTION COMPLETE", align="center", text_color=BRIGHT_WHITE + BOLD, border_color=GREEN))
    print(box_line("", align="center", border_color=GREEN))
    print(box_divider(GREEN))
    print(box_line("", align="left", border_color=GREEN))
    print(box_line(f"TARGET WORD       : {secret_word.upper()}", align="left", text_color=BRIGHT_WHITE, border_color=GREEN))
    print(box_line(f"FAILED ATTEMPTS   : {incorrect_count} / {MAX_INCORRECT_GUESSES}", align="left", text_color=BRIGHT_WHITE, border_color=GREEN))
    print(box_line("STATUS            : SUCCESS", align="left", text_color=GREEN + BOLD, border_color=GREEN))
    print(box_line("", align="left", border_color=GREEN))
    print(box_divider(GREEN))
    print(box_line("", align="center", border_color=GREEN))
    print(box_line("SYSTEM SECURITY BYPASSED ✓", align="center", text_color=GREEN + BOLD, border_color=GREEN))
    print(box_line("", align="center", border_color=GREEN))
    print(box_bottom(GREEN))
    print()


def show_loss_screen(secret_word, incorrect_count):
    """
    Renders the lockdown screen when the player reaches maximum failed attempts.
    """
    clear_screen()
    print()
    print(box_top(RED))
    print(box_line("", align="center", border_color=RED))
    print(box_line("SYSTEM LOCKED", align="center", text_color=RED + BOLD, border_color=RED))
    print(box_line("", align="center", border_color=RED))
    print(box_line("DECRYPTION FAILED", align="center", text_color=BRIGHT_WHITE + BOLD, border_color=RED))
    print(box_line("", align="center", border_color=RED))
    print(box_divider(RED))
    print(box_line("", align="left", border_color=RED))
    print(box_line(f"TARGET WORD       : {secret_word.upper()}", align="left", text_color=BRIGHT_WHITE, border_color=RED))
    print(box_line(f"FAILED ATTEMPTS   : {incorrect_count} / {MAX_INCORRECT_GUESSES}", align="left", text_color=BRIGHT_WHITE, border_color=RED))
    print(box_line("STATUS            : LOCKED", align="left", text_color=RED + BOLD, border_color=RED))
    print(box_line("", align="left", border_color=RED))
    print(box_divider(RED))
    print(box_line("", align="center", border_color=RED))
    print(box_line("TARGET REMAINED SECURE ✕", align="center", text_color=RED + BOLD, border_color=RED))
    print(box_line("", align="center", border_color=RED))
    print(box_bottom(RED))
    print()


def show_exit_screen():
    """
    Displays the graceful exit and session closing terminal banner.
    """
    clear_screen()
    print()
    print(box_top(PURPLE))
    print(box_line("", align="center", border_color=PURPLE))
    print(box_line("NEXUS SESSION CLOSED", align="center", text_color=PURPLE + BOLD, border_color=PURPLE))
    print(box_line("", align="center", border_color=PURPLE))
    print(box_line("Thank you for using the terminal.", align="center", text_color=BRIGHT_WHITE, border_color=PURPLE))
    print(box_line("", align="center", border_color=PURPLE))
    print(box_bottom(PURPLE))
    print()


# -----------------------------------------------------------------------------
# CORE GAME LOOP FOR A SINGLE SESSION
# -----------------------------------------------------------------------------
def play_game():
    """
    Executes one complete game session of HANGMAN // NEXUS.

    Concepts Demonstrated:
      - Predefined list of exactly 5 words
      - random.choice() word selection
      - Tracking guessed letters in a list
      - Counter for incorrect guesses (0 to 6)
      - while loop driving turn-by-turn decryption
      - Input validation & duplicate checking
      - Win & loss conditions
    """
    # Predefined 5 words as specified in project requirements
    words = [
        "python",
        "matrix",
        "cyber",
        "future",
        "coding"
    ]

    # 1. Random word selection using Python standard random library
    secret_word = random.choice(words).lower()

    # 2. Guessed letters list to record all valid guesses made
    guessed_letters = []

    # 3. Incorrect guesses counter (game ends when this reaches MAX_INCORRECT_GUESSES)
    incorrect_guesses = 0

    # Initial dashboard feedback state
    feedback_type = "INFO"
    feedback_title = "→ SYSTEM READY"
    feedback_detail = "Awaiting decryption key input..."

    # 4. Main Turn-Based Game Loop
    while True:
        # Check Win Condition: All unique letters in secret_word have been decoded
        has_won = True
        for letter in secret_word:
            if letter not in guessed_letters:
                has_won = False
                break

        if has_won:
            # Player successfully decoded all characters
            show_win_screen(secret_word, incorrect_guesses)
            break

        # Check Loss Condition: Incorrect guesses reached maximum limit of 6
        if incorrect_guesses >= MAX_INCORRECT_GUESSES:
            # System lock down triggered
            show_loss_screen(secret_word, incorrect_guesses)
            break

        # Render the current terminal dashboard
        display_game(
            secret_word=secret_word,
            guessed_letters=guessed_letters,
            incorrect_count=incorrect_guesses,
            feedback_type=feedback_type,
            feedback_title=feedback_title,
            feedback_detail=feedback_detail,
        )

        # Get operator input
        raw_guess = get_guess()
        guess = raw_guess.lower()

        # 5. Input Validation: Must be exactly ONE alphabetic character
        if len(guess) != 1 or not guess.isalpha():
            feedback_type = "WARNING"
            feedback_title = "[ ! ] INVALID INPUT"
            feedback_detail = "Enter exactly ONE alphabetic character."
            # Note: Invalid inputs do NOT consume an attempt
            continue

        # 6. Duplicate Check: Ensure letter was not already guessed
        if guess in guessed_letters:
            feedback_type = "WARNING"
            feedback_title = "[ ! ] LETTER ALREADY DECODED"
            feedback_detail = f"Letter '{guess.upper()}' was already analyzed. Enter another key."
            # Note: Duplicate inputs do NOT consume an attempt
            continue

        # Record valid guess
        guessed_letters.append(guess)

        # 7. Evaluate Guess: Correct or Incorrect
        if guess in secret_word:
            feedback_type = "SUCCESS"
            feedback_title = "✓ ACCESS FRAGMENT FOUND"
            feedback_detail = f"Letter '{guess.upper()}' successfully decoded."
        else:
            incorrect_guesses += 1
            feedback_type = "ERROR"
            feedback_title = "✕ ACCESS DENIED"
            feedback_detail = f"Letter '{guess.upper()}' does not exist in the target."


# -----------------------------------------------------------------------------
# PROGRAM ENTRY POINT & REPLAY LOOP
# -----------------------------------------------------------------------------
def main():
    """
    Main driver function:
      1. Plays the startup boot sequence
      2. Runs game sessions in a replay loop
      3. Prompts the operator to play again [Y/N]
      4. Displays session closing banner on exit
    """
    try:
        boot_sequence()

        # Replay loop allows starting fresh missions without restarting Python
        while True:
            play_game()

            # Prompt to start another mission
            while True:
                choice = input(f" {GRAY}START ANOTHER MISSION? [{CYAN}Y{GRAY}/{CYAN}N{GRAY}] > {BRIGHT_WHITE}").strip().upper()
                if choice in ["Y", "YES"]:
                    break
                elif choice in ["N", "NO"]:
                    show_exit_screen()
                    return
                else:
                    print(f" {YELLOW}[ ! ] Please enter 'Y' to continue or 'N' to exit.{RESET}")

    except KeyboardInterrupt:
        # Graceful exit on Ctrl+C
        print()
        show_exit_screen()


if __name__ == "__main__":
    main()
