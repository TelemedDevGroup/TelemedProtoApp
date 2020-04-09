package com.itechartgroup.telemedpoc.chat.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;
import java.util.Queue;
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
    private final Queue<ChatMessageDto> messages = new ConcurrentLinkedQueue<>();

    /**
     * Holder requires ID of the user for which its created. Must match to the key of map where its stored.
     *
     * @param userId for which created holder
     */
    public ChatThreadHolder(final Long userId) {
        this.userId = userId;
    }

    public SortedSet<ChatMessageDto> getResult(final LocalDateTime time) {
        return this.messages.stream().filter(msg -> msg.getUpdated().isAfter(time)).collect(Collectors.toCollection(TreeSet::new));
    }

    public synchronized void add(final Thread thread, final ChatMessageDto message) {
        this.messages.add(message);
        this.interruptAll();
        this.add(thread);
    }

    public synchronized void add(final Thread thread, final Collection<ChatMessageDto> messages) {
        this.messages.addAll(messages);
        this.interruptAll();
        this.add(thread);
    }

    public synchronized void add(final Thread thread) {
        this.threads.add(thread);
    }

    public synchronized void removeThread(final Thread thread, final Runnable whenEmpty) {
        removeThread(null, thread, whenEmpty);
    }

    public synchronized void removeThread(final ChatMessageDto message, final Thread thread, final Runnable whenEmpty) {
        this.threads.remove(thread);
        Optional.ofNullable(message).ifPresent(messages::remove);
        if (this.threads.isEmpty()) {
            whenEmpty.run();
        }
    }

    private void interruptAll() {
        this.threads.forEach(Thread::interrupt);
    }
}
