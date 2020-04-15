package com.itechartgroup.telemed.chat.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Queue;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collectors;

/**
 * Thread-safe object to hold polling threads and provide results.
 *
 * @author s.vareyko
 * @since 07.04.2020
 */
public class ChatThreadHolder {

    @Getter
    private final Long userId;
    private final Queue<Thread> threads = new ConcurrentLinkedQueue<>();
    @Getter
    private final Queue<ChatRoomDto> rooms = new ConcurrentLinkedQueue<>();

    /**
     * Holder requires ID of the user for which its created. Must match to the key of map where its stored.
     *
     * @param userId for which created holder
     */
    public ChatThreadHolder(final Long userId) {
        this.userId = userId;
    }

    /**
     * Method to obtain results only after specific timestamp. All results that does not match should not be returned.
     * Synchronization put there because iterated entries can be changed during calculation of the result.
     *
     * @param time stamp for filtering data
     * @return SortedSet with all matching results
     */
    public synchronized SortedSet<ChatRoomDto> getResult(final LocalDateTime time) {
        final TreeSet<ChatRoomDto> results = new TreeSet<>();
        this.rooms.forEach(room -> {
            final SortedSet<ChatMessageDto> messages = room.getMessages().stream()
                    .filter(msg -> msg.getUpdated().isAfter(time)).collect(Collectors.toCollection(TreeSet::new));

            if (!messages.isEmpty()) {
                final ChatRoomDto copy = room.copy();
                copy.setMessages(messages);
                results.add(copy);
            }
        });
        return results;
    }

    /**
     * Method that safely update room in the queue. If room already exists it will copy all messages
     * from old room to the new and remove the old one.
     *
     * @param thread to be registered in purpose of holding this container from removing
     * @param room   new room, to which should be copied old messages if present
     */
    public synchronized void replaceRoom(final Thread thread, final ChatRoomDto room) {
        // copy messages to the new room and remove old one
        this.rooms.stream().filter(room::equals).findFirst()
                .ifPresent(oldRoom -> {
                    room.getMessages().addAll(oldRoom.getMessages());
                    this.rooms.remove(oldRoom);
                });
        // replace old room with just received
        this.rooms.add(room);
        this.interruptAll();
        this.add(thread);
    }

    /**
     * Register specified thread in queue which waits for updates.
     *
     * @param thread to be registered
     */
    public synchronized void add(final Thread thread) {
        this.threads.add(thread);
    }

    /**
     * Overload for {@link #removeThread(ChatMessageDto, Thread, Runnable)}.
     *
     * @see #removeThread(ChatMessageDto, Thread, Runnable)
     */
    public synchronized void removeThread(final Thread thread, final Runnable whenEmpty) {
        removeThread(null, thread, whenEmpty);
    }

    /**
     * Special method for clearing memory resources.
     *
     * @param message   to be removed from memory
     * @param thread    th be removed from memory
     * @param whenEmpty special function that should clear parent resources when there is no more data to share
     */
    public synchronized void removeThread(final ChatMessageDto message, final Thread thread, final Runnable whenEmpty) {
        this.threads.remove(thread);

        Optional.ofNullable(message).ifPresent(msg -> {
            final Set<ChatRoomDto> empties = this.rooms.stream()
                    .filter(room -> room.getMessages().remove(message)) // remove message from room
                    .filter(room -> room.getMessages().isEmpty()).collect(Collectors.toSet()); // collect room as empty
            this.rooms.removeAll(empties); // remove all empty rooms
        });

        if (this.threads.isEmpty()) {
            whenEmpty.run();
        }
    }

    private void interruptAll() {
        this.threads.forEach(Thread::interrupt);
    }
}
